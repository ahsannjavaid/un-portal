import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./Views/SignupForm";
import Instructions from "./Views/Instructions";
import Header from "../../../components/Header";
import { instructorEndpoints } from "../../../services/endpoints/instructorEndpoints";
import { fetchResponse } from "../../../services/service";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Instructor = () => {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ serverStarted, setServerStarted ] = useState(sessionStorage.getItem("serverStarted") ? true : false);

  localStorage.clear();

  const registerInstructor = async () => {
    setIsLoading(true);
    try {
      const data = await fetchResponse(
        instructorEndpoints.registerInstructor(),
        1,
        { fname, lname, email, password, subject }
      );
      alert(data.message);
      if (data.success) {
        localStorage.setItem("data", JSON.stringify(data.data));
        localStorage.setItem("id", data.data._id);
        localStorage.setItem("firstName", fname);
        localStorage.setItem("email", email);
        localStorage.setItem("subject", subject);
        navigate("/instructor-interface");
      }
      setServerStarted(true);
      sessionStorage.setItem("serverStarted", 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if(isLoading) return <LoadingSpinner showingApologoies={!serverStarted ? true : false} />

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
