const Models = require("../models");
const fs = require("fs");
const { cache } = require("../lib");

// Optimized: Fetch all games with field projection and caching
const all = async (modelDb, selectFields = null) => {
  const cacheKey = `all_${modelDb}_${selectFields || 'full'}`;
  
  return await cache.getOrSet(
    cacheKey,
    async () => {
      const query = Models[modelDb].find().sort({"position": 1}).limit(150).lean();
      
      // Only select specific fields if provided (reduces data transfer)
      if (selectFields) {
        return await query.select(selectFields).exec();
      }
      return await query.exec();
    },
    3600 // Cache for 1 hour
  );
};

// Optimized: Top six with caching (changes every 30 minutes for variety)
const topsix = async (modelDb) => {
  const cacheKey = `topsix_${modelDb}`;
  
  return await cache.getOrSet(
    cacheKey,
    async () => {
      return await Models[modelDb].aggregate([
        { $sample: { size: 20 } }
      ]).exec();
    },
    1800 // Cache for 30 minutes (fresher content)
  );
};

// Optimized: Find with caching for common queries
const find = async (modelDb, queryObj, useCache = true) => {
  if (!useCache) {
    return await Models[modelDb].find(queryObj).lean().exec();
  }
  
  const cacheKey = `find_${modelDb}_${JSON.stringify(queryObj)}`;
  
  return await cache.getOrSet(
    cacheKey,
    async () => {
      return await Models[modelDb].find(queryObj).lean().exec();
    },
    1800 // Cache for 30 minutes
  );
};

// Optimized: FindOne with caching
const findOne = async (modelDb, queryObj, useCache = true) => {
  if (!useCache) {
    return await Models[modelDb].findOne(queryObj).lean().exec();
  }
  
  const cacheKey = `findOne_${modelDb}_${JSON.stringify(queryObj)}`;
  
  return await cache.getOrSet(
    cacheKey,
    async () => {
      return await Models[modelDb].findOne(queryObj).lean().exec();
    },
    3600 // Cache for 1 hour
  );
};
const findOneAndSelect = async (modelDb, queryObj, selectQuery) =>
  await Models[modelDb].findOne(queryObj).select(selectQuery).exec();

const insertNewDocument = async (modelDb, storeObj) => {
  let data = new Models[modelDb](storeObj);
  return await data.save();
};

const updateDocument = async (modelDb, updateQuery, setQuery) =>
  await Models[modelDb].findOneAndUpdate(
    updateQuery,
    { $set: setQuery },
    { new: true }
  );

const customUpdate = async (modelDb, updateQuery, setQuery) =>
  await Models[modelDb].updateOne(updateQuery, setQuery);

const pushIntoArray = async (modelDb, updateQuery, setQuery) =>
  await Models[modelDb].findOneAndUpdate(
    updateQuery,
    { $addToSet: setQuery },
    { new: true }
  );

const deleteDocument = async (modelDb, deleteQuery) =>
  await Models[modelDb].deleteOne(deleteQuery);

const findOneAndPopulate = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .findOne(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const findAndPopulate = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .find(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const findPopulateSortAndLimit = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery,
  sortedBy,
  skip,
  limit
) =>
  await Models[modelDb]
    .find(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .sort(sortedBy)
    .skip(skip)
    .limit(limit)
    .lean();

const findSliceAndPopulate = async (
  modelDb,
  searchQuery,
  sliceQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .find(searchQuery, sliceQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const findAndPopulateNested = async (modelDb, searchQuery, populate) =>
  await Models[modelDb].find(searchQuery).populate(populate).lean();

const findSliceAndPopulateNested = async (
  modelDb,
  searchQuery,
  sliceQuery,
  populate
) =>
  await Models[modelDb].find(searchQuery, sliceQuery).populate(populate).lean();

const getAggregate = async (modelDb, aggregateQuery) =>
  await Models[modelDb].aggregate(aggregateQuery);

const findOneSliceAndPopulate = async (
  modelDb,
  searchQuery,
  sliceQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .findOne(searchQuery, sliceQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .lean();

const findOneSliceAndCustomPopulate = async (
  modelDb,
  searchQuery,
  sliceQuery,
  customQuery
) =>
  await Models[modelDb]
    .findOne(searchQuery, sliceQuery)
    .populate(customQuery)
    .lean();

const getDataWithLimit = async (modelDb, searchQuery, sortedBy, skip, limit) =>
  await Models[modelDb]
    .find(searchQuery)
    .sort(sortedBy)
    .skip(skip)
    .limit(limit)
    .exec();

const getDataSelectWithLimit = async (
  modelDb,
  searchQuery,
  selectQuery,
  sortedBy,
  skip,
  limit
) =>
  await Models[modelDb]
    .find(searchQuery)
    .select(selectQuery)
    .sort(sortedBy)
    .skip(skip)
    .limit(limit)
    .exec();

module.exports = {
  all,
  topsix,
  find,
  findOne,
  insertNewDocument,
  updateDocument,
  deleteDocument,
  findOneAndPopulate,
  findAndPopulate,
  pushIntoArray,
  findAndPopulateNested,
  customUpdate,
  getAggregate,
  findOneSliceAndPopulate,
  findOneSliceAndCustomPopulate,
  getDataWithLimit,
  getDataSelectWithLimit,
  findSliceAndPopulateNested,
  findSliceAndPopulate,
  findOneAndSelect,
  findPopulateSortAndLimit,
};
