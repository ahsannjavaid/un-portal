const InstructorsSch = require("../../models/InstructorsSch");

// posting instructors signup information into cloud database...
async function registerInstructor(req, res) {
  // sending data in cloud database...
  const instruct = new InstructorsSch(req.body);
  const result = await instruct.save();
  res.send(result);
}

module.exports = registerInstructor;
