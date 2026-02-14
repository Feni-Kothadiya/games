const NodeCache = require('node-cache');

// Create cache instance with TTL (Time To Live) configuration
// stdTTL: 3600 seconds (1 hour) - default cache duration
// checkperiod: 600 seconds (10 minutes) - interval to check for expired keys
const cache = new NodeCache({ 
  stdTTL: 3600, 
  checkperiod: 600,
  useClones: false // Better performance by not cloning objects
});

/**
 * Get value from cache
 * @param {string} key - Cache key
 * @returns {*} Cached value or undefined if not found
 */
const get = (key) => {
  try {
    return cache.get(key);
  } catch (error) {
    console.error(`Cache get error for key ${key}:`, error);
    return undefined;
  }
};

/**
 * Set value in cache
 * @param {string} key - Cache key
 * @param {*} value - Value to cache
 * @param {number} ttl - Optional TTL in seconds (overrides default)
 * @returns {boolean} Success status
 */
const set = (key, value, ttl = undefined) => {
  try {
    return cache.set(key, value, ttl);
  } catch (error) {
    console.error(`Cache set error for key ${key}:`, error);
    return false;
  }
};

/**
 * Delete specific key from cache
 * @param {string} key - Cache key to delete
 * @returns {number} Number of deleted entries
 */
const del = (key) => {
  try {
    return cache.del(key);
  } catch (error) {
    console.error(`Cache delete error for key ${key}:`, error);
    return 0;
  }
};

/**
 * Clear all cache
 */
const flush = () => {
  try {
    cache.flushAll();
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Cache flush error:', error);
  }
};

/**
 * Get cache statistics
 * @returns {object} Cache stats
 */
const getStats = () => {
  return cache.getStats();
};

/**
 * Wrapper function for caching database queries
 * @param {string} key - Cache key
 * @param {Function} fetchFunction - Function to fetch data if not cached
 * @param {number} ttl - Optional TTL in seconds
 * @returns {Promise<*>} Cached or fresh data
 */
const getOrSet = async (key, fetchFunction, ttl = undefined) => {
  try {
    // Try to get from cache first
    const cachedData = get(key);
    
    if (cachedData !== undefined) {
      return cachedData;
    }
    
    // If not in cache, fetch fresh data
    const freshData = await fetchFunction();
    
    // Store in cache for next time
    set(key, freshData, ttl);
    
    return freshData;
  } catch (error) {
    console.error(`Cache getOrSet error for key ${key}:`, error);
    // If caching fails, still return the data
    return await fetchFunction();
  }
};

module.exports = {
  get,
  set,
  del,
  flush,
  getStats,
  getOrSet,
  cache // Export the cache instance for advanced usage
};

