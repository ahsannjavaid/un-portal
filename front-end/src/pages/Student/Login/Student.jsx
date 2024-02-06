import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Views/LoginForm";
import Header from "../../../components/Header";
import { fetchResponse } from "../../../services/service";
import { studentEndpoints } from "../../../services/endpoints/studentEndpoints";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Student = () => {
  const navigate = useNavigate();

  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ serverStarted, setServerStarted ] = useState(sessionStorage.getItem("serverStarted") ? true : false);

  localStorage.clear();

  const CheckStudent = async () => {
    setIsLoading(true);
    try {
      const data = await fetchResponse(studentEndpoints.loginStudent(), 1, {
        studentID,
        password,
      });
      alert(data?.message);
      if (data.success) {
        localStorage.setItem("data", JSON.stringify(data.data));
        localStorage.setItem("fname", data.data.fname);
        localStorage.setItem("studentID", data.data.studentID);
        navigate("/student-interface");
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
    <div className="container">
      <Header />
      <h4 className="text text-start mt-4 mb-5">| Student LOGIN</h4>
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card border-0">
            <div className="card-body p-0">
              <div className="row no-gutters mt-0">
                <div className="col-lg-6">
                  <div className="p-5 border" style={{ color: "#4D3189" }}>
                    <LoginForm
                      studentID={studentID}
                      setStudentID={setStudentID}
                      password={password}
                      setPassword={setPassword}
                      CheckStudent={CheckStudent}
                    />
                  </div>
                </div>
                <div className="col-lg-6 d-none d-lg-inline-block">
                  <div className="account-block rounded-right">
                    <div className="overlay rounded-right" />
                    <div className="account-testimonial">
                      <p className="lead text-white">
                        <i>
                          "The seeking of knowledge is obligatory for every
                          Muslim."
                        </i>
                      </p>
                      <p>- Prophet Muhammad (PBUH)</p>
                      <p>(Al-Tirmidhi, Hadith 74)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
