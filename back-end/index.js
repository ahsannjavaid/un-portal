const express = require("express");
const cors = require("cors");
require("./db/config");
const homeRoute = require("./routes/homeRoute");
const instructorRoute = require("./routes/instructorRoute");
const studentRoute = require("./routes/studentRoute");
const examRoute = require("./routes/examRoute");

const app = express();
const port = process.env.PORT || 5000; // process.env.PORT is generated automatically

// middlewares
app.use(express.json());
app.use(cors());

// APIs
app.use("", homeRoute);
app.use("", instructorRoute);
app.use("", studentRoute);
app.use("", examRoute);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
