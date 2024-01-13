const express = require("express");
const registerInstructor = require("../controllers/instructorControllers/registerInstructor");
const getAllInstructors = require("../controllers/instructorControllers/getAllInstructors");
const updateInstructor = require("../controllers/instructorControllers/updateInstructor");
const deleteInstructor = require("../controllers/instructorControllers/deleteInstructor");

const router = express.Router();

router.post("/instructors", registerInstructor);
router.get("/instructors-details", getAllInstructors);
router.put("/instructor-details/:id", updateInstructor);
router.delete("/instructor-details/:id", deleteInstructor);

module.exports = router;
