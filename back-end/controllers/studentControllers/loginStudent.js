const ExamSch = require("../../models/ExamSch");
const InstructorsSch = require("../../models/InstructorsSch");
const StudentSch = require("../../models/StudentSch");

async function loginStudent(req, res) {
  try {
    const { studentID, password } = req.body;
    let result = await StudentSch.findOne({ studentID });
    result = { ...result._doc, instructors: [] };

    // fetching student's intructors email information
    const distinctInstructorEmails = await ExamSch.find(
      { "selectedStudents.studentID": studentID },
      { _id: 0, instructorEmail: 1 }
    ).distinct("instructorEmail");

    // fetching instructors name
    for (let index = 0; index < distinctInstructorEmails.length; index++) {
      const element = distinctInstructorEmails[index];
      const instructor = await InstructorsSch.findOne({ email: element });

      if (instructor) {
        result.instructors.push({
          fname: instructor.fname,
          lname: instructor.lname,
          subject: instructor.subject,
        });
      } else {
        return res.status(500).send({
          success: false,
          message: "Something went wrong while logging in student.",
        });
      }
    }

    if (result) {
      if (result.password === password) {
        res.status(200).send({
          success: true,
          message: "Student login successfully!",
          data: result,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Wrong password!",
        });
      }
    } else {
      res.status(404).send({
        success: false,
        message: "We do not have any Student with this Roll number.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while logging in student.",
    });
  }
}

module.exports = loginStudent;
