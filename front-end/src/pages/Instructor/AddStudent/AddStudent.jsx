import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../services/config";
import Navbar from "../../../components/Navbar";
import StudentRegistrationForm from "./Views/StudentRegistrationForm";

const AddStudent = () => {
  const navigate = useNavigate();

  const instructorEmail = localStorage.getItem("email");
  const instructorSubject = localStorage.getItem("subject");

  let marks = "";
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");

  const registerStudent = async () => {
    if (fname && studentID && password && instructorEmail) {
      alert("Successfully registered!");
      navigate("/view-students");
      await fetch(`${BASE_URL}students`, {
        method: "post",
        body: JSON.stringify({
          fname,
          lname,
          studentID,
          password,
          instructorEmail,
          instructorSubject,
          marks,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      alert("You have to fill the form in order to register student!");
    }
  };

  return (
    <>
      <Navbar tab={2} navNo={1} />
      <div className="container mt-5">
        <h4 className="text text-start fw-bolder mb-4">| REGISTER STUDENT</h4>
        <StudentRegistrationForm
          fname={fname}
          setFname={setFname}
          lname={lname}
          setLname={setLname}
          studentID={studentID}
          setStudentID={setStudentID}
          password={password}
          setPassword={setPassword}
          registerStudent={registerStudent}
        />
      </div>
    </>
  );
};

export default AddStudent;
