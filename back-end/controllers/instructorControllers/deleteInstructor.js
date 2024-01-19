const InstructorsSch = require("../../models/InstructorsSch");

// deleting the instructor...
async function deleteInstructor(req, res) {
  try {
    const _id = req.params.id;
    await InstructorsSch.findByIdAndDelete(_id);
    res.status(200).send({
      success: true,
      message: "Instructor deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting Instructor.",
    });
  }
}

module.exports = deleteInstructor;
