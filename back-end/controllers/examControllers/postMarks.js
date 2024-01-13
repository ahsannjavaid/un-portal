const ExamSch = require("../../models/ExamSch");

// posting in marks collection...
async function postMarks(req, res) {
  const exam = new ExamSch(req.body);
  const result = await exam.save();
  res.send(result);
}

module.exports = postMarks;
