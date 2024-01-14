const StudentSch = require("../../models/StudentSch");

async function loginStudent(req, res) {
  try {
    const { studentID, password } = req.body;
    const result = await StudentSch.findOne({ studentID });
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
