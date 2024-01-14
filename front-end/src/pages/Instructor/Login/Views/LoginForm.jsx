import React from "react";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  loginCheck,
}) {
  return (
    <form>
      <div className="form-group">
        <h6>Email address</h6>
        <input
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="email"
          className="form-control mb-3"
          placeholder="name@host.domain"
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
          onClick={loginCheck}
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
