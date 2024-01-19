const ExamSch = require("../../models/ExamSch");

// posting in marks collection...
async function postMarks(req, res) {
  const {
    examType,
    weightage,
    obtWeightage,
    points,
    activityNumber,
    instructorEmail,
    instructorSubject,
    selectedStudents,
  } = req.body;

  try {
    switch (true) {
      case !examType:
        return res.status(206).send({
          success: false,
          message: "Exam type is mandatory.",
        });
      case !weightage:
        return res.status(206).send({
          success: false,
          message: "Weightage is mandatory.",
        });
      case !points:
        return res.status(206).send({
          success: false,
          message: "Points value is mandatory.",
        });
      case !activityNumber:
        return res.status(206).send({
          success: false,
          message: "Activity number is mandatory.",
        });
      case !selectedStudents?.length:
        return res.status(206).send({
          success: false,
          message: "You cannot post Marks as you do not have enough students.",
        });
      default:
        break;
    }

    const exam = new ExamSch({
      examType,
      weightage,
      obtWeightage,
      points,
      activityNumber,
      instructorEmail,
      instructorSubject,
      selectedStudents,
    });
    const result = await exam.save();
    res.status(200).send({
      success: true,
      message: "Marks posted successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while posting Marks.",
    });
  }
}

module.exports = postMarks;
