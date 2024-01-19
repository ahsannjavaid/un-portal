const StudentSch = require("../../models/StudentSch");

// getting students of a particular instructor...
async function getParticularStudents(req, res) {
  try {
    const { email } = req.query;

    const result = await StudentSch.find({ instructorEmail: email });

    if (result) {
      res.status(200).send({
        success: true,
        message: "Students fetched successfully!",
        data: result,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "This instructor does not have any Student.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching Students.",
    });
  }
}

module.exports = getParticularStudents;
