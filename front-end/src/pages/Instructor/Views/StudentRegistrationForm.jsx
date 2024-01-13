import React from "react";

export default function StudentRegistrationForm({
  fname,
  setFname,
  lname,
  setLname,
  studentID,
  setStudentID,
  password,
  setPassword,
  registerStudent,
}) {
  return (
    <form>
      <div
        className="border-start border-top border-end primary p-3"
        style={{ color: "#4D3189" }}
      >
        <div className="row mb-3">
          <h6>Name</h6>
          <div className="col">
            <input
              onChange={(event) => setFname(event.target.value)}
              value={fname}
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
            />
          </div>
          <div className="col">
            <input
              onChange={(event) => setLname(event.target.value)}
              value={lname}
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
        </div>
        <div>
          <div className="row mb-3">
            <div>
              <h6>Student ID</h6>
              <p className="fst-italic fw-light">(Assign a Unique ID)</p>
              <input
                onChange={(event) => setStudentID(event.target.value)}
                value={studentID}
                type="number"
                className="form-control"
                placeholder="9999"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div>
              <h6>Password</h6>
              <p className="fst-italic fw-light">(Assign a Password)</p>
              <input
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-grid mt-3">
        <button
          onClick={registerStudent}
          className="btn btn-outline fw-bold"
          type="submit"
          style={{ color: "#4D3189", borderColor: "#4D3189" }}
        >
          ADD
        </button>
      </div>
    </form>
  );
}
