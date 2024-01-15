const express = require("express");
const postMarks = require("../controllers/examControllers/postMarks");
const getAllMarks = require("../controllers/examControllers/getAllMarks");
const getParticularMarks = require("../controllers/examControllers/getParticularMarks");

const router = express.Router();

router.post("/marks", postMarks);
router.get("/marks-details", getAllMarks);

router.get("/get-particular-marks", getParticularMarks);

module.exports = router;
