const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.games = require("./games");
db.categories = require("./categories");

module.exports = db;
