const InstructorsSch = require("../../models/InstructorsSch");

async function loginInstructor(req, res) {
  try {
    const { email, password } = req.body;
    const result = await InstructorsSch.findOne({ email });
    if (result) {
      if (result.password === password) {
        res.status(200).send({
          success: true,
          message: "Instructor login successfully!",
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
        message: "We do not have any Instructor with this Email address.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while logging in instructor.",
    });
  }
}

module.exports = loginInstructor;
