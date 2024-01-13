const InstructorsSch = require("../../models/InstructorsSch");

// getting all instructors record from cloud database...
async function getAllInstructors(req, res) {
  const result = await InstructorsSch.find();
  res.send(result);
}

module.exports = getAllInstructors;
