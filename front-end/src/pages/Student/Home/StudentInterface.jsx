import React from "react";
import Carousel from "../../../components/Carousel";
import Navbar from "../../../components/Navbar";

const StudentInterface = () => {
  const firstName = JSON.parse(localStorage.getItem('data')).fname;
  const studentID = JSON.parse(localStorage.getItem('data')).studentID;

  return (
    <>
      <Navbar tab={1} navNo={2} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <h4>
              Welcome{" "}
              <span style={{ color: "#4D3189" }}>
                <b>{firstName}</b>
              </span>{" "}
              !
            </h4>
          </div>
          <div className="col-6 text-end">
            <h4>
              <span>
                <b style={{ color: "#4D3189" }}>{studentID}</b> |
              </span>
            </h4>
          </div>
        </div>
        <hr />
        <Carousel crsNo={2} />
      </div>
    </>
  );
};
export default StudentInterface;
