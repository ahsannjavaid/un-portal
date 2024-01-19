const express = require("express");
const displayHomePage = require("../controllers/homeControllers/displayHomePage");

const router = express.Router();

router.get("/", displayHomePage);

module.exports = router;
