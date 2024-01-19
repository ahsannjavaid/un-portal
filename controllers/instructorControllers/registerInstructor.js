const InstructorsSch = require("../../models/InstructorsSch");

// posting instructors signup information into cloud database...
async function registerInstructor(req, res) {
  const { fname, lname, email, password, subject } = req.body;

  try {
    switch (true) {
      case !fname:
        return res.status(206).send({
          success: false,
          message: "First name is mandatory.",
        });
      case !email:
        return res.status(206).send({
          success: false,
          message: "Email address is mandatory.",
        });
      case !password:
        return res.status(206).send({
          success: false,
          message: "Password is mandatory.",
        });
      case !subject:
        return res.status(206).send({
          success: false,
          message: "Subject is mandatory.",
        });
      default:
        break;
    }

    const instruct = new InstructorsSch({
      fname,
      lname,
      email,
      password,
      subject,
    });
    const result = await instruct.save();
    res.status(200).send({
      success: true,
      message: "Instructor registered successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while registering the Instructor.",
    });
  }
}

module.exports = registerInstructor;
