const StudentSch = require("../../models/StudentSch");

// deleting the student through viewStudent.js page...
async function deleteStudent(req, res) {
  const _id = req.params.id;
  const deleteStudent = await StudentSch.findByIdAndDelete(_id);
  res.send(deleteStudent);
}

module.exports = deleteStudent;
