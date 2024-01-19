// making student Schema

const mongoose = require('mongoose')
const studentSchema = mongoose.Schema({
    fname: String,
    lname: String,
    studentID: Number,
    password: String,
    instructorEmail: String,
    instructorSubject: String,
    marks: Number
})

module.exports = mongoose.model('students',studentSchema)