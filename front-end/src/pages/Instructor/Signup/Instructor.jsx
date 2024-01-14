import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../services/config";
import SignupForm from "./Views/SignupForm";
import Instructions from "./Views/Instructions";
import Header from "../../../components/Header";

const Instructor = () => {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");

  localStorage.clear();
  const registerInstructor = async () => {
    if (fname && lname && email && password && subject) {
      alert("You are registered successfully!");
      await fetch(`${BASE_URL}instructors`, {
        method: "post",
        body: JSON.stringify({ fname, lname, email, password, subject }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("firstName", fname);
      localStorage.setItem("email", email);
      localStorage.setItem("subject", subject);
      navigate("/instructor-interface");
      window.location.reload();
    } else {
      alert("You have to fill the form in order to register!");
    }
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="row mt-5 mb-3" style={{ color: "#4D3189" }}>
          <div className="col-md-4 mt-4 text-center">
            <Instructions />
          </div>
          <div className="col-md-8">
            <h3>
              <span className="d-grid badge bg-secondary mb-4 mt-4">
                SIGN-UP
              </span>
            </h3>
            <SignupForm
              fname={fname}
              setFname={setFname}
              lname={lname}
              setLname={setLname}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setSubject={setSubject}
              registerInstructor={registerInstructor}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructor;
