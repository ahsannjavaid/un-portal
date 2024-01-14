import React from "react";

export default function StudentInformation({
  fname,
  lname,
  password,
  studentID,
  fillForm,
}) {
  return (
    <>
      <h3>
        <span className="d-grid badge bg-secondary mb-5">ABOUT</span>
      </h3>
      <p
        className="border b-primary p-2 text-center mb-5"
        style={{ color: "#4D3189" }}
      >
        Click on <b>Show Info</b> button to see your about.
        <br />
        <b>NOTE: </b>You are not allowed to edit <i>Student ID</i>!
      </p>
      <p>
        <img
          style={{ marginRight: "11px" }}
          src="./images/name.png"
          alt="name"
          width="25px"
          height="22px"
        />
        {fname} {lname}
      </p>
      <p>
        <img
          style={{ marginRight: "12px" }}
          src="./images/email.png"
          alt="emailaddress"
          width="23px"
          height="19px"
        />
        {studentID}
      </p>
      <p>
        <img
          style={{ marginRight: "17px" }}
          src="./images/password.png"
          alt="password"
          width="18px"
          height="24px"
        />
        <b>{password}</b>
      </p>
      <div className="d-grid">
        <button
          onClick={fillForm}
          className="btn btn-outline fw-bold mt-3"
          type="button"
          style={{ color: "#4D3189", borderColor: "#4D3189" }}
        >
          Show Info
        </button>
      </div>
    </>
  );
}
