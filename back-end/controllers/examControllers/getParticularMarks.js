const ExamSch = require("../../models/ExamSch");

// getting academic information regarding a particular instructor...
async function getParticularMarks(req, res) {
  try {
    const { email } = req.query;

    const result = await ExamSch.find({ instructorEmail: email });

    if (result) {
      res.status(200).send({
        success: true,
        message: "Marks fetched successfully!",
        data: result,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "This instructor has never posted Marks.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching Marks.",
    });
  }
}

module.exports = getParticularMarks;
