const express = require("express");
const registerStudent = require("../controllers/studentControllers/registerStudent");
const updateStudent = require("../controllers/studentControllers/updateStudent");
const getAllStudents = require("../controllers/studentControllers/getAllStudents");
const deleteStudent = require("../controllers/studentControllers/deleteStudent");
const loginStudent = require("../controllers/studentControllers/loginStudent");
const getParticularStudents = require("../controllers/studentControllers/getParticularStudents");
const getMarksOfParticularStudent = require("../controllers/studentControllers/getMarksOfParticularStudent");

const router = express.Router();

router.post("/students", registerStudent);
router.get("/students-details", getAllStudents);
router.put("/student-details/:id", updateStudent);
router.delete("/student-details/:id", deleteStudent);

router.post("/login-student", loginStudent);
router.get("/get-particular-students", getParticularStudents);
router.get("/get-particular-student-marks/:id", getMarksOfParticularStudent);

module.exports = router;
