const ExamSch = require("../../models/ExamSch");

// getting posted marks...
async function getAllMarks(req, res) {
  const result = await ExamSch.find();
  res.send(result);
}

module.exports = getAllMarks;
