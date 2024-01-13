const express = require("express");
const registerStudent = require("../controllers/studentControllers/registerStudent");
const updateStudent = require("../controllers/studentControllers/updateStudent");
const getAllStudents = require("../controllers/studentControllers/getAllStudents");
const deleteStudent = require("../controllers/studentControllers/deleteStudent");

const router = express.Router();

router.post("/students", registerStudent);
router.get("/students-details", getAllStudents);
router.put("/student-details/:id", updateStudent);
router.delete("/student-details/:id", deleteStudent);

module.exports = router;