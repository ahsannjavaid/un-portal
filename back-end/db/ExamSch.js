// exam schema

const mongoose = require('mongoose')
const examSchema = mongoose.Schema({
    examType: String,
    activityNumber: Number,
    weightage: Number,
    obtWeightage: Number,
    points: Number,
    instructorSubject: String,
    instructorEmail: String,
    selectedStudents: [{
        fname: String,
        lname: String,
        studentID: Number,
        marks: Number
    }]
})

module.exports = mongoose.model('exam', examSchema)