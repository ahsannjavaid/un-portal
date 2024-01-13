const express = require('express')
const cors = require('cors')
require('./db/config')
const Instructors = require('./db/InstructorsSch')
const Students = require('./db/StudentSch')
const Exams = require('./db/ExamSch')

const app = express()
const port = process.env.PORT || 5000       // process.env.PORT is generated automatically IG

app.use(express.json())
app.use(cors())

app.get("/",(req,res) => {
    console.log("Home page displayed console message!");
    res.send("Home page displayed!");
})

// posting instructors signup information into cloud database...
app.post("/instructors",async(req,res) => {
    // sending data in cloud database...
    const instruct = new Instructors(req.body)
    const result = await instruct.save()
    res.send(result)
})

// posting students register information into cloud database...
app.post("/students",async(req,res) => {
    const student = new Students(req.body)
    const result = await student.save()
    res.send(result)
})

// getting all instructors record from cloud database...
app.get("/instructors-details",async(req,res) => {
    const result = await Instructors.find()
    res.send(result)
})

// getting students record from cloud database...
app.get("/students-details",async(req,res) => {
    const result = await Students.find()
    res.send(result)
})

// updating the instructor...
app.put("/instructor-details/:id",async(req,res) => {
    const _id = req.params.id
    const updateInstructor = await Instructors.findByIdAndUpdate(_id,req.body)
    res.send(updateInstructor)
})

// updating the student...
app.put("/student-details/:id",async(req,res) => {
    const _id = req.params.id
    const updateStudent = await Students.findByIdAndUpdate(_id,req.body)
    res.send(updateStudent)
})

// posting in marks collection...
app.post("/marks",async(req,res) => {
    
    const exam = new Exams(req.body)
    const result = await exam.save()
    res.send(result)
})

// getting posted marks...
app.get("/marks-details",async(req,res) => {
    const result = await Exams.find()
    res.send(result)
})

// deleting the instructor...
app.delete("/instructor-details/:id",async(req,res) => {
    const _id = req.params.id
    const deleteInstructor = await Instructors.findByIdAndDelete(_id)
    res.send(deleteInstructor)
})

// deleting the student through viewStudent.js page...
app.delete("/student-details/:id",async(req,res) => {
    const _id = req.params.id
    const deleteStudent = await Students.findByIdAndDelete(_id)
    res.send(deleteStudent)
})

app.listen(port,() => {
    console.log(`Server started at port ${port}`)
})