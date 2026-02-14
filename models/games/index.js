const mongoose = require("mongoose");
const gamesSchema = require("./games-schema");

const games = mongoose.model("games", gamesSchema);

module.exports = games;
