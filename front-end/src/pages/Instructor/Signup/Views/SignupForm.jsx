import React from "react";

export default function SignupForm({
  fname,
  setFname,
  lname,
  setLname,
  email,
  setEmail,
  password,
  setPassword,
  setSubject,
  registerInstructor,
}) {
  return (
    <form>
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
          <div className="col">
            <h6>Email address</h6>
            <input
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              type="email"
              className="form-control"
              placeholder="name@host.domain"
            />
          </div>
          <div className="col">
            <h6>Password</h6>
            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type="password"
              className="form-control"
            />
          </div>
        </div>
      </div>
      <h6>Subject</h6>
      <select
        onClick={(event) => setSubject(event.target.value)}
        className="form-select mt-2"
        aria-label="Default select example"
      >
        <option>Not selected</option>
        <option value={"Islamiat"}>Islamiat</option>
        <option value={"Computer Science"}>Computer Science</option>
        <option value={"Biology"}>Biology</option>
        <option value={"Chemistry"}>Chemistry</option>
        <option value={"Physics"}>Physics</option>
        <option value={"English"}>English</option>
        <option value={"Urdu"}>Urdu</option>
        <option value={"Pakistan Studies"}>Pakistan Studies</option>
        <option value={"Mathematics"}>Mathematics</option>
      </select>
      <div className="d-grid mt-4">
        <button
          onClick={registerInstructor}
          className="btn btn-outline fw-bold"
          type="submit"
          style={{ color: "#4D3189", borderColor: "#4D3189" }}
        >
          REGISTER
        </button>
      </div>
    </form>
  );
}
