import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
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
      <h3 className="text-center text-danger mt-5">Oops, Page not found!</h3>
    </div>
  );
};

export default Error;
