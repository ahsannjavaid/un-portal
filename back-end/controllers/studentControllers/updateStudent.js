const StudentSch = require("../../models/StudentSch");

// updating the student...
async function updateStudent(req, res) {
  try {
    const _id = req.params.id;

    const updateStudent = await StudentSch.findByIdAndUpdate(
      _id,
      req.body,
      {new: true}
    );
    if (updateStudent) {
      res.status(200).send({
        success: true,
        message: "Student information updated successfully!",
        data: updateStudent
      });
    } else {
      console.log(updateStudent);
      res.status(404).send({
        success: false,
        message: "We do not have any Student with this Email address.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating Student information.",
    });
  }
}

module.exports = updateStudent;
