import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import InstructorForm from "./Views/InstructorForm";
import InstructorInformation from "./Views/InstructorInformation";
import { fetchResponse } from "../../../services/service";
import { instructorEndpoints } from "../../../services/endpoints/instructorEndpoints";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Account = () => {
  const thisData = JSON.parse(localStorage.getItem("data"));

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [_id, set_id] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fillForm = () => {
    setFname(thisData.fname);
    setLname(thisData.lname);
    setEmail(thisData.email);
    setPassword(thisData.password);
    setSubject(thisData.subject);
    set_id(thisData._id);
  };

  const UpdateInstructor = async () => {
    setIsLoading(true);
    try {
      const data = await fetchResponse(
        instructorEndpoints.editInstructor(_id),
        2,
        { fname, lname, email, password, subject }
      );
      alert(data.message);
      localStorage.setItem("data", JSON.stringify(data.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Navbar tab={5} navNo={1} />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3 border-end pe-md-5 mb-4 mt-4">
            <InstructorInformation
              fname={fname}
              lname={lname}
              email={email}
              password={password}
              subject={subject}
              fillForm={fillForm}
            />
          </div>
          <div className="col-md-9 ps-md-5 mb-4 mt-4">
            <InstructorForm
              fname={fname}
              setFname={setFname}
              lname={lname}
              setLname={setLname}
              email={email}
              password={password}
              setPassword={setPassword}
              subject={subject}
              UpdateInstructor={UpdateInstructor}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
