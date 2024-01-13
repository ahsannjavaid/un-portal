const InstructorsSch = require("../../models/InstructorsSch");

// updating the instructor...
async function updateInstructor(req, res) {
  const _id = req.params.id;
  const updateInstructor = await InstructorsSch.findByIdAndUpdate(
    _id,
    req.body
  );
  res.send(updateInstructor);
}

module.exports = updateInstructor;
