import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../../services/helper";
import Navbar from "../../components/Navbar";
import ExamTypeNavigation from "./Views/ExamTypeNavigation";
import StudentsMarksTable from "./Views/StudentsMarksTable";
import StudentsActionTable from "./Views/StudentsActionTable";
import ViewOptions from "./Views/ViewOptions";

const ViewStudents = () => {
  const instructorEmail = localStorage.getItem("email");

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  let [marks, setMarks] = useState([]);
  const [requiredMarks, setRequiredMarks] = useState([]);
  let [examTypeArray, setExamTypeArray] = useState([]);
  const [choice, setChoice] = useState(0);
  let [index, setIndex] = useState(0);

  const getStudents = async () => {
    let result = await fetch(`${BASE_URL}students-details`);
    result = await result.json();
    if (result) {
      setStudents(result);
    } else {
      console.log("Check your Internet connection!");
    }
  };

  const getMarks = async () => {
    let result = await fetch(`${BASE_URL}marks-details`);
    if (result) {
      result = await result.json();
      setMarks(result);
    } else {
      console.log("Marks not found!");
    }
  };

  useEffect(() => {
    getStudents();
    getMarks();
  }, []);

  const viewStudents = () => {
    let a = 0;
    let duplciateArray = [];
    for (let i = 0; i < students.length; i++) {
      if (students[i].instructorEmail === instructorEmail) {
        duplciateArray[a++] = { ...students[i] };
      }
    }
    setSelectedStudents(duplciateArray);
    setChoice(1);
  };

  const ViewRecord = () => {
    let a = 0,
      z = 0,
      check = false;
    let duplciateArray = [];

    for (let i = 0; i < students.length; i++) {
      if (students[i].instructorEmail === instructorEmail) {
        duplciateArray[z++] = { ...students[i] };
      }
    }
    setSelectedStudents(duplciateArray);

    for (let i = 0; i < marks.length; i++) {
      if (marks[i].instructorEmail === instructorEmail) {
        requiredMarks[a] = { ...marks[i] };
        for (let j = 0; j < requiredMarks[a].selectedStudents.length; j++) {
          check = false;
          for (let k = 0; k < duplciateArray.length; k++) {
            if (
              requiredMarks[a].selectedStudents[j].studentID ===
              duplciateArray[k].studentID
            ) {
              check = true;
              break;
            }
          }
          if (!check) {
            // deleting element from array... splice(ind,howMany)
            requiredMarks[a].selectedStudents.splice(j, 1);
          }
        }
        a++;
      }
    }
    if (requiredMarks.length) {
      setRequiredMarks(requiredMarks);
      examTypeArray = { ...requiredMarks[index] };
      setExamTypeArray(examTypeArray);
      setChoice(2);
    }
  };

  const ActivityNavDec = () => {
    if (index > 0) {
      index--;
    }
    setIndex(index);
    examTypeArray = { ...requiredMarks[index] };
    setExamTypeArray(examTypeArray);
  };

  const ActivityNavInc = () => {
    if (index < requiredMarks.length - 1) {
      index++;
    }
    setIndex(index);
    examTypeArray = { ...requiredMarks[index] };
    setExamTypeArray(examTypeArray);
  };

  const DeleteStudent = (id) => {
    fetch(`${BASE_URL}student-details/${id}`, {
      method: "delete",
    });
    alert("Successfully deleted!");
    window.location.reload();
  };

  if (choice === 0) {
    return (
      <>
        <Navbar tab={3} navNo={1} />
        <div className="container text-center mt-5">
          <ViewOptions viewStudents={viewStudents} ViewRecord={ViewRecord} />
        </div>
      </>
    );
  } else if (choice === 1) {
    return (
      <>
        <Navbar tab={3} navNo={1} />
        <div className="container text-center mt-5">
          <div className="row">
            <div className="col col-6 text-start">
              <h4 className="fw-bold me-5">| YOUR STUDENTS</h4>
            </div>
            <div className="col text-end">
              <ViewOptions
                viewStudents={viewStudents}
                ViewRecord={ViewRecord}
              />
            </div>
          </div>
          <br />
          <StudentsActionTable
            selectedStudents={selectedStudents}
            DeleteStudent={DeleteStudent}
          />
        </div>
      </>
    );
  } else if (choice === 2) {
    return (
      <>
        <Navbar tab={3} navNo={1} />
        <div className="container text-center mt-5">
          <div className="row">
            <div className="col col-6 text-start">
              <h4 className="fw-bold me-5">| RECORD</h4>
            </div>
            <div className="col text-end">
              <ViewOptions
                viewStudents={viewStudents}
                ViewRecord={ViewRecord}
              />
            </div>
          </div>
          <br />
          <div className="mb-4">
            <ExamTypeNavigation
              ActivityNavDec={ActivityNavDec}
              ActivityNavInc={ActivityNavInc}
            />
          </div>
          <StudentsMarksTable examTypeArray={examTypeArray} />
        </div>
      </>
    );
  }
  if (!requiredMarks.length) {
    return (
      <>
        <Navbar tab={3} navNo={1} />
        <div className="container text-center">
          <h5 style={{ color: "red", marginTop: "2.5in" }}>No record found!</h5>
        </div>
      </>
    );
  }
};

export default ViewStudents;
