import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ navNo, tab }) => {
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark"
      style={{ backgroundColor: "#4D3189" }}
    >
      <div className="container">
        <Link to={"/"}>
          <img
            src="./images/logo_white_0.0.png"
            alt="logo"
            height="25px"
            width="100px"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mx-auto">
            {navNo === 1 ? (
              <>
                <Link
                  className={`nav-item nav-link ${tab === 1 ? "active" : ""}`}
                  to={"/instructor-interface"}
                >
                  HOME
                </Link>
                <Link
                  className={`nav-item nav-link ${tab === 2 ? "active" : ""}`}
                  to={"/add-student"}
                >
                  ADD STUDENT
                </Link>
                <Link
                  className={`nav-item nav-link ${tab === 3 ? "active" : ""}`}
                  to={"/view-students"}
                >
                  YOUR STUDENTS
                </Link>
                <Link
                  className={`nav-item nav-link ${tab === 4 ? "active" : ""}`}
                  to={"/post-marks"}
                >
                  POST MARKS
                </Link>
              </>
            ) : (
              <>
                <Link
                  className={`nav-item nav-link ${tab === 1 ? "active" : ""}`}
                  to={"/student-interface"}
                >
                  HOME
                </Link>
                <Link
                  className={`nav-item nav-link ${tab === 2 ? "active" : ""}`}
                  to={"/marks"}
                >
                  MARKS
                </Link>
              </>
            )}
          </div>
          <div className="navbar-nav mx-end">
            {navNo === 1 ? (
              <>
                <Link to={"/account"}>
                  <img
                    className="me-2"
                    src="./images/account_white.png"
                    alt="account"
                    height={`${tab === 5 ? "35px" : "30px"}`}
                    width={`${tab === 5 ? "35px" : "30px"}`}
                  />
                </Link>
                <Link to={"/instructor"}>
                  <img
                    src="./images/logout_circle.png"
                    alt="logout"
                    height="30px"
                    width="30px"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link to={"/accountS"}>
                  <img
                    className="me-2"
                    src="./images/account_white.png"
                    alt="account"
                    height={`${tab === 3 ? "35px" : "30px"}`}
                    width={`${tab === 3 ? "35px" : "30px"}`}
                  />
                </Link>
                <Link to={"/student"}>
                  <img
                    src="./images/logout_circle.png"
                    alt="logout"
                    height="30px"
                    width="30px"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
