import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../../services/config";
import Navbar from "../../../components/Navbar";
import StudentForm from "./Views/StudentForm";
import StudentInformation from "./Views/StudentInformation";

const AccountS = () => {
  const localStudentID = localStorage.getItem("studentID");

  let studentSubjects = [];
  let studentInstructorsObjects = [];
  let studentsInstructorEmail = [];

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [studentID, setStudentID] = useState();
  let [_id, set_id] = useState();
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  let [requiredInstructors, setRequiredInstructors] = useState([]);

  const getStudents = async () => {
    let result = await fetch(`${BASE_URL}students-details`);
    result = await result.json();
    if (result) {
      setStudents(result);
    } else {
      console.log("Instructors-details not found!");
    }
  };

  const getInstructors = async () => {
    let result = await fetch(`${BASE_URL}instructors-details`);
    result = await result.json();
    if (result) {
      setInstructors(result);
    } else {
      console.log("Instructors-details not found!");
    }
  };

  useEffect(() => {
    getStudents();
    getInstructors();
  }, []);

  const fillForm = () => {
    let check = true;
    for (let i = 0; i < students.length; i++) {
      if (students[i].studentID === parseInt(localStudentID)) {
        check = true;
        setFname(students[i].fname);
        setLname(students[i].lname);
        setStudentID(students[i].studentID);
        setPassword(students[i].password);
        _id = students[i]._id;
        set_id(_id);
        for (let j = 0; j < studentSubjects.length + 1; j++) {
          if (studentSubjects[j] === students[i].instructorSubject) {
            check = false;
          }
        }
        if (check) {
          studentSubjects.push(students[i].instructorSubject);
          studentsInstructorEmail.push(students[i].instructorEmail);
        }
      }
    }
    // getting student's instructors name...
    let a = 0;
    for (let u = 0; u < studentsInstructorEmail.length; u++) {
      for (let v = 0; v < instructors.length; v++) {
        if (studentsInstructorEmail[u] === instructors[v].email) {
          studentInstructorsObjects[a++] = { ...instructors[v] };
        }
      }
    }
    requiredInstructors = studentInstructorsObjects;
    setRequiredInstructors(requiredInstructors);
  };

  const UpdateStudent = () => {
    fetch(`${BASE_URL}student-details/${_id}`, {
      method: "put",
      body: JSON.stringify({ fname, lname, password, studentID }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Successfully updated!");
  };

  return (
    <>
      <Navbar tab={3} navNo={2} />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3 border-end pe-md-5 mb-4 mt-4">
            <StudentInformation
              fname={fname}
              lname={lname}
              password={password}
              studentID={studentID}
              fillForm={fillForm}
            />
          </div>
          <div className="col-md-9 ps-md-5 mb-4 mt-4">
            <StudentForm
              fname={fname}
              setFname={setFname}
              lname={lname}
              setLname={setLname}
              password={password}
              setPassword={setPassword}
              studentID={studentID}
              requiredInstructors={requiredInstructors}
              UpdateStudent={UpdateStudent}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountS;
