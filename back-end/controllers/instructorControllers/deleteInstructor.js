const InstructorsSch = require("../../models/InstructorsSch");

// deleting the instructor...
async function deleteInstructor(req, res) {
  const _id = req.params.id;
  const deleteInstructor = await InstructorsSch.findByIdAndDelete(_id);
  res.send(deleteInstructor);
}

module.exports = deleteInstructor;
