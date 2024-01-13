const StudentSch = require("../../models/StudentSch");

// posting students register information into cloud database...
async function registerStudent(req, res) {
  const student = new StudentSch(req.body);
  const result = await student.save();
  res.send(result);
}

module.exports = registerStudent;
