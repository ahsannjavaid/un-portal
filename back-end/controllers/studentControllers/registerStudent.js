const StudentSch = require("../../models/StudentSch");

// posting students register information into cloud database...
async function registerStudent(req, res) {
  const {
    fname,
    lname,
    studentID,
    password,
    instructorEmail,
    instructorSubject,
    marks
  } = req.body;

  try {
    switch (true) {
      case !fname:
        return res.status(206).send({
          success: false,
          message: "First name is mandatory.",
        });
      case !studentID:
        return res.status(206).send({
          success: false,
          message: "Student ID is mandatory.",
        });
      case !password:
        return res.status(206).send({
          success: false,
          message: "Password is mandatory.",
        });
      default:
        break;
    }

    const student = new StudentSch({
      fname,
    lname,
    studentID,
    password,
    instructorEmail,
    instructorSubject,
    marks
    });
    const result = await student.save();
    res.status(200).send({
      success: true,
      message: "Student added successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while registering the Student.",
    });
  }
}

module.exports = registerStudent;
