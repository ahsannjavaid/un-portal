const StudentSch = require("../../models/StudentSch");

// deleting the student through viewStudent.js page...
async function deleteStudent(req, res) {
  try {
    const _id = req.params.id;
    await StudentSch.findByIdAndDelete(_id);
    res.status(200).send({
      success: true,
      message: "Student deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting Student.",
    });
  }
}

module.exports = deleteStudent;
