import React from "react";

export default function StudentForm({
  fname,
  setFname,
  lname,
  setLname,
  studentID,
  password,
  setPassword,
  requiredInstructors,
  UpdateStudent,
}) {
  return (
    <form style={{ color: "#4D3189" }}>
      <h3>
        <span className="d-grid badge bg-secondary mb-4">EDIT PANEL</span>
      </h3>
      <div className="row mb-3">
        <h6>Name</h6>
        <div className="col">
          <input
            type="text"
            onChange={(event) => setFname(event.target.value)}
            value={fname}
            className="form-control"
            aria-label="First name"
          />
        </div>

        <div className="col">
          <input
            type="text"
            onChange={(event) => setLname(event.target.value)}
            value={lname}
            className="form-control"
            aria-label="Last name"
          />
        </div>
      </div>
      <div className="row mb-3">
        <fieldset disabled>
          <div>
            <h6>Student ID</h6>
            <input readOnly type="email" value={studentID} className="form-control" />
          </div>
        </fieldset>
      </div>
      <div className="row mb-3">
        <div>
          <h6>Password</h6>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            className="form-control"
          />
        </div>
      </div>
      <fieldset>
        <h6>Instructors and Subjects <span className="fw-normal fst-italic">(Not for editing)</span></h6>
        <select className="form-select">
          {requiredInstructors?.map((x, ind) => (
            <option key={ind}>
              {x.fname} {x.lname} - {x.subject}
            </option>
          ))}
        </select>
      </fieldset>
      <div className="d-grid mt-3">
        <button
          onClick={UpdateStudent}
          className="btn btn-outline fw-bold"
          type="submit"
          style={{ color: "#4D3189", borderColor: "#4D3189" }}
        >
          UPDATE
        </button>
      </div>
    </form>
  );
}
