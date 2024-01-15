import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import StudentRegistrationForm from "./Views/StudentRegistrationForm";
import { fetchResponse } from "../../../services/service";
import { studentEndpoints } from "../../../services/endpoints/studentEndpoints";

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
    try {
      const data = await fetchResponse(studentEndpoints.registerStudent(), 1, {
        fname,
        lname,
        studentID,
        password,
        instructorEmail,
        instructorSubject,
        marks,
      });
      alert(data.message);
      if (data.success) {
        navigate("/view-students");
      }
    } catch (error) {
      console.log(error);
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
