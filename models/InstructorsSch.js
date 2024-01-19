// instructors schema

const mongoose = require('mongoose')
const instructorsSchema = mongoose.Schema ({
    fname: String,
    lname: String,
    email: String,
    password: String,
    subject: String
})
module.exports = mongoose.model('instructors',instructorsSchema)