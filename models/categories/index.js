const mongoose = require("mongoose");
const categorySchema = require("./categories-schema");

const categories = mongoose.model("categories", categorySchema);

module.exports = categories;
