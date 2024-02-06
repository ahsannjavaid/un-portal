import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Views/Card";
import { homeEndpoints } from "../../services/endpoints/homeEndpoints";
import { fetchResponse } from "../../services/service";

const Home = () => {
  let instructorImage = "./images/instructor.jpg";
  let studentImage = "./images/student.jpg";

  useEffect(() => {
    async function startServer() {
      try {
        await fetchResponse(homeEndpoints.home(), 0, null);
      } catch (error) {
        console.error(error);
      }
    }
    startServer();
  }, []);

  return (
    <div className="container">
      <div className="row mt-4 mb-2">
        <div className="col">
          <div className="text-center">
            <Link to={"/"}>
              <img
                className="img"
                src="./images/logo_0.0.png"
                alt="logo"
                height="30px"
                width="120px"
              />
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mt-5">
        <div className="col-md-6 d-flex justify-content-center">
          <Card
            image={instructorImage}
            name={"INSTRUCTOR"}
            alt={"instructor"}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <Card image={studentImage} name={"STUDENT"} alt={"student"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
