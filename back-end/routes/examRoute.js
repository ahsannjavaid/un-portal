const express = require("express");
const postMarks = require("../controllers/examControllers/postMarks");
const getAllMarks = require("../controllers/examControllers/getAllMarks");

const router = express.Router();

router.post("/marks", postMarks);
router.get("/marks-details", getAllMarks);

module.exports = router;
