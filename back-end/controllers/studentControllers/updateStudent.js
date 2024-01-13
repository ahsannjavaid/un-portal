const StudentSch = require("../../models/StudentSch");

// updating the student...
async function updateStudent(req, res) {
  const _id = req.params.id;
  const updateStudent = await StudentSch.findByIdAndUpdate(_id, req.body);
  res.send(updateStudent);
}

module.exports = updateStudent;
