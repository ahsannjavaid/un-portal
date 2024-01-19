const InstructorsSch = require("../../models/InstructorsSch");

// getting all instructors record from cloud database...
async function getAllInstructors(req, res) {
  try {
    const result = await InstructorsSch.find();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Instructors fetched successfully!",
        data: result,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No record found.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching Instructors.",
    });
  }
}

module.exports = getAllInstructors;
