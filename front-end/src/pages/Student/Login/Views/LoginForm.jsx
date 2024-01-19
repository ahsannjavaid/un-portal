import React from "react";

export default function LoginForm({
  studentID,
  setStudentID,
  password,
  setPassword,
  CheckStudent,
}) {
  return (
    <form>
      <div className="form-group">
        <h6>Student ID</h6>
        <input
          onChange={(event) => setStudentID(event.target.value)}
          value={studentID}
          type="number"
          className="form-control mb-3"
          placeholder="9999"
        />
      </div>
      <div className="form-group mb-5">
        <h6>Password</h6>
        <input
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
          className="form-control"
        />
      </div>
      <div className="d-grid mt-3">
        <button
          onClick={CheckStudent}
          className="btn btn-outline fw-bold"
          type="submit"
          style={{ color: "#4D3189", borderColor: "#4D3189" }}
        >
          LOGIN
        </button>
      </div>
    </form>
  );
}
