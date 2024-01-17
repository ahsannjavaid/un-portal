const InstructorsSch = require("../../models/InstructorsSch");

// updating the instructor...
async function updateInstructor(req, res) {
  try {
    const _id = req.params.id;

    const updateInstructor = await InstructorsSch.findByIdAndUpdate(
      _id,
      req.body,
      {new: true}
    );
    if (updateInstructor) {
      res.status(200).send({
        success: true,
        message: "Instructor information updated successfully!",
        data: updateInstructor
      });
    } else {
      console.log(updateInstructor);
      res.status(404).send({
        success: false,
        message: "We do not have any Instructor with this Email address.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating Instructor information.",
    });
  }
}

module.exports = updateInstructor;
