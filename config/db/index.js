const mongoose = require("mongoose");
const { DB_USER, DB_PASS, DB_NAME } = require("../");

// Optimized MongoDB connection with pooling and performance options
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@games.gp17cfc.mongodb.net/${DB_NAME}`,
  {
    // Connection pool settings - optimize concurrent connections
    maxPoolSize: 10, // Maximum number of connections in the pool
    minPoolSize: 2,  // Minimum number of connections to maintain
    
    // Performance optimizations
    maxIdleTimeMS: 10000, // Close idle connections after 10 seconds
    serverSelectionTimeoutMS: 5000, // Timeout for server selection
    socketTimeoutMS: 45000, // Socket timeout
    
    // Compression
    compressors: ['zlib'], // Enable compression for network traffic
  }
);

module.exports = mongoose;
