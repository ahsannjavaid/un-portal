const StudentSch = require("../../models/StudentSch");

// getting students record from cloud database...
async function getAllStudents(req, res) {
  const result = await StudentSch.find();
  res.send(result);
}

module.exports = getAllStudents;
