const express = require("express");
const trending = require("./trending");
const router = express.Router();

router.get("/trending", trending);

module.exports = router;
