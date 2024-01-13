import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../services/helper";
import Navbar from "../../components/Navbar";
import InstructorForm from "./Views/InstructorForm";
import InstructorInformation from "./Views/InstructorInformation";

const Account = () => {
  const localEmail = localStorage.getItem("email");
  const [instructors, setInstructors] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [_id, set_id] = useState(0);

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
    getInstructors();
  }, []);

  const fillForm = () => {
    for (let i = 0; i < instructors.length; i++) {
      if (instructors[i].email === localEmail) {
        setFname(instructors[i].fname);
        setLname(instructors[i].lname);
        setEmail(instructors[i].email);
        setPassword(instructors[i].password);
        setSubject(instructors[i].subject);
        set_id(instructors[i]._id);
      }
    }
  };

  const UpdateInstructor = () => {
    fetch(`${BASE_URL}instructor-details/${_id}`, {
      method: "put",
      body: JSON.stringify({ fname, lname, email, password, subject }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

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
