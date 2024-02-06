import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Views/LoginForm";
import Header from "../../../components/Header";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { instructorEndpoints } from "../../../services/endpoints/instructorEndpoints";
import { fetchResponse } from "../../../services/service";

const InstructorLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ serverStarted, setServerStarted ] = useState(sessionStorage.getItem("serverStarted") ? true : false);

  const loginCheck = async () => {
    setIsLoading(true);
    try {
      const data = await fetchResponse(
        instructorEndpoints.loginInstructor(),
        1,
        {
          email,
          password,
        }
      );
      alert(data?.message);
      if (data.success) {
        localStorage.setItem("data", JSON.stringify(data.data));
        localStorage.setItem("id", data.data._id);
        localStorage.setItem("firstName", data.data.fname);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("subject", data.data.subject);
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

  if (isLoading) return <LoadingSpinner showingApologoies={!serverStarted ? true : false} />;

  return (
    <>
      <div className="container">
        <Header />
        <h4 className="text text-start mt-4 mb-5">| Instructor LOGIN</h4>
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters mt-0">
                  <div className="col-lg-6">
                    <div className="p-5 border" style={{ color: "#4D3189" }}>
                      <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        loginCheck={loginCheck}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right" />
                      <div className="account-testimonial">
                        <h4 className="text-white mb-4">A Teacher</h4>
                        <p className="lead text-white">
                          <i>
                            "Everything seeks forgiveness for the teacher of
                            virtue, even fish in the sea."
                          </i>
                        </p>
                        <p>- Prophet Muhammad (PBUH)</p>
                        <p>(Musnad al-Bazzar)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorLogin;
