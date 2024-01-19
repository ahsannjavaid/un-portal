import React from "react";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import StudentForm from "./Views/StudentForm";
import StudentInformation from "./Views/StudentInformation";
import { studentEndpoints } from "../../../services/endpoints/studentEndpoints";
import { fetchResponse } from "../../../services/service";
import LoadingSpinner from "../../../components/LoadingSpinner";

const AccountS = () => {
  const thisData = JSON.parse(localStorage.getItem("data"));

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [studentID, setStudentID] = useState();
  let [_id, set_id] = useState();
  const [password, setPassword] = useState("");
  let [requiredInstructors, setRequiredInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fillForm = () => {
    setFname(thisData.fname);
    setLname(thisData.lname);
    setStudentID(thisData.studentID);
    setPassword(thisData.password);
    set_id(thisData._id);
    setRequiredInstructors(thisData.instructors);
  };

  const UpdateStudent = async () => {
    setIsLoading(true);
    try {
      const data = await fetchResponse(studentEndpoints.editStudent(_id), 2, {
        fname,
        lname,
        password,
        studentID,
      });
      alert(data.message);
      localStorage.setItem(
        "data",
        JSON.stringify({ ...thisData, fname, lname, password })
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if(isLoading) return <LoadingSpinner />

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
