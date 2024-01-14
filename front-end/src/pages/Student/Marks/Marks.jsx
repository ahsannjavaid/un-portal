import React from "react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../services/config";
import Navbar from "../../../components/Navbar";
import SubjectNavigation from "./Views/SubjectNavigation";
import StudentMarksTable from "./Views/StudentMarksTable";

const Marks = () => {
  const studentID = localStorage.getItem("studentID");

  let totPoints = 0,
    totMarks = 0,
    totWeightage = 0,
    totObtWeightage = 0;
  let requiredExam = [];
  let studentSubjects = [];
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [recordSubject, setRecordSubject] = useState("");

  const getMarks = async () => {
    let result = await fetch(`${BASE_URL}marks-details`);
    if (result) {
      result = await result.json();
      setMarks(result);
    } else {
      console.log("Marks not found!");
    }
  };

  const getStudents = async () => {
    let result = await fetch(`${BASE_URL}students-details`);
    result = await result.json();
    if (result) {
      setStudents(result);
    } else {
      console.log("Instructors-details not found!");
    }
  };

  useEffect(() => {
    getMarks();
    getStudents();
  }, []);

  let a = 0,
    b = 0;
  let check = true;
  for (let i = 0; i < marks.length; i++) {
    for (let j = 0; j < marks[i].selectedStudents.length; j++) {
      if (marks[i].selectedStudents[j].studentID === parseInt(studentID)) {
        if (marks[i].instructorSubject === recordSubject) {
          requiredExam[a] = { ...marks[i] };
          requiredExam[a].weightage = requiredExam[a].weightage.toFixed(2);
          requiredExam[a].selectedStudents = marks[i].selectedStudents[j].marks;
          requiredExam[a].obtWeightage = (
            (requiredExam[a].selectedStudents / requiredExam[a].points) *
            requiredExam[a].weightage
          ).toFixed(2);
          totMarks += requiredExam[a].selectedStudents;
          totPoints += requiredExam[a].points;
          totWeightage += parseFloat(requiredExam[a].weightage);
          totObtWeightage += parseFloat(requiredExam[a].obtWeightage);
          a++;
        }
      }
    }
  }

  for (let k = 0; k < students.length; k++) {
    if (students[k].studentID === parseInt(studentID)) {
      check = true;
      for (let l = 0; l < studentSubjects.length + 1; l++) {
        if (studentSubjects[l] === students[k].instructorSubject) {
          check = false;
        }
      }
      if (check) {
        studentSubjects[b++] = { ...students[k] };
      }
    }
  }

  if (recordSubject) {
    return (
      <>
        <Navbar tab={2} navNo={2} />
        <div className="container mt-5 text-center">
          <h4 className="text text-start fw-bolder mb-4">| YOUR RECORD</h4>
          <div className="row">
            <div className="col"></div>
            <div className="col col-4">
              <SubjectNavigation
                studentSubjects={studentSubjects}
                setRecordSubject={setRecordSubject}
              />
            </div>
            <div className="col"></div>
          </div>
          <StudentMarksTable
            requiredExam={requiredExam}
            totWeightage={totWeightage}
            totObtWeightage={totObtWeightage}
            totPoints={totPoints}
            totMarks={totMarks}
          />
        </div>
      </>
    );
  }

  if (requiredExam) {
    return (
      <>
        <Navbar tab={2} navNo={2} />
        <div className="container mt-5 text-center">
          <h4 className="text text-start fw-bolder mb-4">| YOUR RECORD</h4>
          <div className="row">
            <div className="col"></div>
            <div className="col col-4">
              <SubjectNavigation
                studentSubjects={studentSubjects}
                setRecordSubject={setRecordSubject}
              />
            </div>
            <div className="col"></div>
          </div>
        </div>
      </>
    );
  }

  if (!requiredExam) {
    return (
      <>
        <Navbar tab={2} navNo={2} />
        <div className="container text-center">
          <h5 style={{ color: "red", marginTop: "2.5in" }}>No record found!</h5>
        </div>
      </>
    );
  }
};

export default Marks;
