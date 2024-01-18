const ExamSch = require("../../models/ExamSch");

// getting marks of a particular student...
async function getMarksOfParticularStudent(req, res) {
  try {
    const studentID = parseInt(req.params.id);

    const result = await ExamSch.find({ selectedStudents: { $elemMatch: { studentID } } });

    // filtering result of other students...
    const requiredResult = result.map((x) => {
        let student = x.selectedStudents.filter((y) => y.studentID === studentID)[0];
    
        // Destructuring to exclude selectedStudents
        const { selectedStudents, ...rest } = x._doc;
    
        return {
            ...rest,
            fname: student ? student.fname : undefined,
            lname: student ? student.lname : undefined,
            marks: student ? student.marks : undefined,
            studentID: student ? student.studentID : undefined
        };
    });    
        
    if (result.length > 0) {
      res.status(200).send({
        success: true,
        message: "Student's Marks fetched successfully!",
        data: requiredResult,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "This student does not have any Marks record.",
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

module.exports = getMarksOfParticularStudent;
