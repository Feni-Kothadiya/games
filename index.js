const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
var path = require('path');
const routes = require('./routes')
const { all, findOne, topsix, find } = require("./helpers");
const { cache } = require("./lib");
const app = express();

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected!");
});

// ============================================
// MIDDLEWARE CONFIGURATION (Optimized Order)
// ============================================

// 1. Compression - compress all responses (60-80% bandwidth reduction)
app.use(compression({
  level: 6, // Compression level (0-9, 6 is good balance)
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// 2. CORS - Enable before routes
app.use(cors());

// 3. Body Parser - Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 4. Morgan - Only in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan("short"));
}

// 5. Static files with proper caching
const staticOptions = {
  maxAge: '1d', // Cache for 1 day
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    // Cache game assets and images longer
    if (filePath.includes('/games/') || filePath.includes('/thumbs/') || filePath.includes('/catthumb/')) {
      res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days
    }
    // Cache CSS/JS files
    if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    }
  }
};

// Use absolute path so static works on Vercel/Linux too.
const publicDir = path.join(__dirname, 'public');
app.use('/public', express.static(publicDir, staticOptions));
// Also expose static files from root path for platform compatibility.
app.use(express.static(publicDir, staticOptions));

// Remove duplicate static middleware (was at line 116)
// app.use(express.static(path.join(__dirname, 'public'))); // REMOVED - duplicate

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
  try {
    var fullUrl = 'https://' + req.get('host') + req.originalUrl;
    const [games, categories] = await Promise.all([
      all("games"),
      all('categories')
    ]);

    res.render('index', { data: games, categories: categories, url: fullUrl, category: null });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

app.use("/mvmaster", async (req, res) => {
  try {
    var fullUrl = 'https://' + req.get('host') + req.originalUrl;

    const [games, categories] = await Promise.all([
      all("games"),
      all('categories')
    ]);

    res.render('index', { data: games, categories: categories, url: fullUrl, category: null });
  } catch (err) {
  }
});

app.use("/category", async (req, res) => {
  try {
    var fullUrl = 'https://' + req.get('host') + req.originalUrl;
    var search = req.url.replace("/", "");
    const [games, categories] = await Promise.all([
      find("games", { category: search }),
      all('categories')
    ]);

    search = search[0].toUpperCase() + search.substring(1);
    res.render('index', { data: games, categories: categories, url: fullUrl, category: search });
  } catch (err) {
  }
});

// ============================================
// API ROUTES
// ============================================
// app.use("/api", routes);

app.post('/api/trending', async (req, res) => {
  try {
    const games = await topsix("games");
    res.render('search/games', { games: games });
  } catch (e) {

  }
});




app.post('/api/search', async (req, res) => {
  try {
    const { keyword } = req.body;
    const games = await find("games", {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { desc: { $regex: keyword, $options: 'i' } }
      ]
    });
    res.render('search/games', { games: games });
  } catch (e) {

  }
});

app.post('/play/api/trending', async (req, res) => {
  try {
    const games = await topsix("games");
    res.render('submain/searchgames', { games: games });
  } catch (e) {

  }
});

app.post('/play/api/search', async (req, res) => {
  try {
    const { keyword } = req.body;
    const games = await find("games", {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { desc: { $regex: keyword, $options: 'i' } }
      ]
    });
    res.render('submain/searchgames', { games: games });
  } catch (e) {

  }
});

app.use("/play", async (req, res) => {
  var fullUrl = 'https://' + req.get('host') + req.originalUrl;
  const userAgent = req.headers['user-agent'];
  const isMobile = /Mobi/.test(userAgent);
  const search = "/game" + req.url;
  const game = await findOne("games", { "pagelink": search });
  try {
    const [data, categories] = await Promise.all([all("games"), all("categories")]);
    if (game) {
      res.render('game', { game: game, data: data, categories: categories, isMobile, url: fullUrl });
    } else {
      res.render('index', { data: data, categories: categories, url: fullUrl, category: null });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }

});


app.use("/game", async (req, res) => {
  var fullUrl = 'https://' + req.get('host') + req.originalUrl;
  const userAgent = req.headers['user-agent'];
  const isMobile = /Mobi/.test(userAgent);
  const search = "/game" + req.url;
  const game = await findOne("games", { "pagelink": search });
  try {
    const [data, categories] = await Promise.all([all("games"), all("categories")]);
    if (game) {
      res.render('game', { game: game, data: data, categories: categories, isMobile, url: fullUrl });
    } else {
      res.render('index', { data: data, categories: categories, url: fullUrl, category: null });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }

});

app.use("/games", express.static(path.join(__dirname, "public/games")));
app.use("/aboutus", (req, res) => {
  var fullUrl = 'https://' + req.get('host') + req.originalUrl;
  res.render('aboutus', { url: fullUrl });
});
app.use("/privacy", (req, res) => {
  var fullUrl = 'https://' + req.get('host') + req.originalUrl;
  res.render('privacy', { url: fullUrl });
});
app.use("/terms", (req, res) => {
  var fullUrl = 'https://' + req.get('host') + req.originalUrl;
  res.render('terms', { url: fullUrl });
});

app.use("/testads", (req, res) => {
  var fullUrl = 'https://' + req.get('host') + req.originalUrl;
  res.render('testads', { url: fullUrl });
});

// ============================================
// MONITORING & ADMIN ENDPOINTS (Development)
// ============================================

// CPU & Memory Monitoring
app.get('/admin/monitor', (req, res) => {
  const usage = process.cpuUsage();
  const memory = process.memoryUsage();

  res.json({
    cpu: {
      user: (usage.user / 1000000).toFixed(2) + ' seconds',
      system: (usage.system / 1000000).toFixed(2) + ' seconds',
      total: ((usage.user + usage.system) / 1000000).toFixed(2) + ' seconds'
    },
    memory: {
      rss: (memory.rss / 1024 / 1024).toFixed(2) + ' MB',
      heapTotal: (memory.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
      heapUsed: (memory.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      external: (memory.external / 1024 / 1024).toFixed(2) + ' MB',
      heapUsagePercent: ((memory.heapUsed / memory.heapTotal) * 100).toFixed(2) + '%'
    },
    uptime: (process.uptime() / 60).toFixed(2) + ' minutes',
    pid: process.pid,
    nodeVersion: process.version
  });
});

// Cache Statistics
app.get('/admin/cache-stats', (req, res) => {
  const stats = cache.getStats();
  const hitRate = stats.hits + stats.misses > 0
    ? ((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(2)
    : 0;

  res.json({
    hits: stats.hits,
    misses: stats.misses,
    hitRate: hitRate + '%',
    keys: stats.keys,
    ksize: stats.ksize,
    vsize: stats.vsize,
    status: hitRate > 90 ? '✅ Excellent' : hitRate > 70 ? '✓ Good' : '⚠️ Needs Warmup'
  });
});

// Performance Dashboard
app.get('/admin/dashboard', (req, res) => {
  const cacheStats = cache.getStats();
  const memory = process.memoryUsage();
  const uptime = process.uptime();
  const hitRate = cacheStats.hits + cacheStats.misses > 0
    ? ((cacheStats.hits / (cacheStats.hits + cacheStats.misses)) * 100).toFixed(2)
    : 0;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Performance Dashboard - Tap Tap Games</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          padding: 20px;
          background: #f5f7fa;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #2c3e50; margin-bottom: 10px; }
        .subtitle { color: #7f8c8d; margin-bottom: 30px; }
        .metrics { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .metric { 
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .metric h2 { 
          font-size: 18px;
          color: #34495e;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
        }
        .metric h2 span { font-size: 24px; margin-right: 10px; }
        .metric-row { 
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #ecf0f1;
        }
        .metric-row:last-child { border-bottom: none; }
        .metric-label { color: #7f8c8d; }
        .metric-value { 
          font-weight: bold;
          color: #2c3e50;
        }
        .good { color: #27ae60; }
        .warning { color: #f39c12; }
        .excellent { color: #27ae60; font-size: 20px; }
        .refresh-note { 
          background: #3498db;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
          margin-bottom: 20px;
        }
        .status-indicator {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #27ae60;
          margin-left: 10px;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      </style>
      <meta http-equiv="refresh" content="5">
    </head>
    <body>
      <div class="container">
        <h1>🚀 Performance Dashboard <span class="status-indicator"></span></h1>
        <p class="subtitle">Real-time performance monitoring</p>
        <div class="refresh-note">⟳ Auto-refreshes every 5 seconds</div>
        
        <div class="metrics">
          <div class="metric">
            <h2><span>💾</span> Cache Performance</h2>
            <div class="metric-row">
              <span class="metric-label">Cache Hits</span>
              <span class="metric-value good">${cacheStats.hits}</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Cache Misses</span>
              <span class="metric-value">${cacheStats.misses}</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Hit Rate</span>
              <span class="metric-value ${hitRate > 90 ? 'good' : 'warning'}">${hitRate}%</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Cached Keys</span>
              <span class="metric-value">${cacheStats.keys}</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Status</span>
              <span class="metric-value ${hitRate > 90 ? 'good' : 'warning'}">
                ${hitRate > 90 ? '✅ Excellent' : hitRate > 70 ? '✓ Good' : '⚠️ Warming Up'}
              </span>
            </div>
          </div>
          
          <div class="metric">
            <h2><span>💻</span> Memory Usage</h2>
            <div class="metric-row">
              <span class="metric-label">RSS (Total)</span>
              <span class="metric-value">${(memory.rss / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Heap Used</span>
              <span class="metric-value">${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Heap Total</span>
              <span class="metric-value">${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">External</span>
              <span class="metric-value">${(memory.external / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Heap Usage</span>
              <span class="metric-value">${((memory.heapUsed / memory.heapTotal) * 100).toFixed(2)}%</span>
            </div>
          </div>
          
          <div class="metric">
            <h2><span>⏱️</span> Server Info</h2>
            <div class="metric-row">
              <span class="metric-label">Uptime</span>
              <span class="metric-value good">${(uptime / 60).toFixed(2)} minutes</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Process ID</span>
              <span class="metric-value">${process.pid}</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Node.js Version</span>
              <span class="metric-value">${process.version}</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Environment</span>
              <span class="metric-value">${process.env.NODE_ENV || 'development'}</span>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 8px;">
          <h2 style="margin-bottom: 15px;">📊 API Endpoints</h2>
          <ul style="list-style: none;">
            <li style="padding: 5px 0;"><a href="/admin/monitor" style="color: #3498db;">GET /admin/monitor</a> - CPU & Memory JSON</li>
            <li style="padding: 5px 0;"><a href="/admin/cache-stats" style="color: #3498db;">GET /admin/cache-stats</a> - Cache Statistics JSON</li>
            <li style="padding: 5px 0;"><a href="/admin/dashboard" style="color: #3498db;">GET /admin/dashboard</a> - This Dashboard</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

// 404 handler - Optimized to not query DB on every 404
app.use("*", async (req, res) => {
  try {
    var fullUrl = 'https://' + req.get('host') + req.originalUrl;
    // Use cache for 404 page data (most 404s are bots/crawlers)
    const cacheKey = '404_page_data';
    const cachedData = await cache.getOrSet(
      cacheKey,
      async () => {
        const [games, categories] = await Promise.all([
          all("games"),
          all('categories')
        ]);
        return { games, categories };
      },
      1800 // Cache 404 page data for 30 minutes
    );

    res.status(404).render('404', {
      data: cachedData.games,
      categories: cachedData.categories,
      url: fullUrl,
      category: null
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;

// Vercel uses serverless handler export, not app.listen().
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}

module.exports = app;
