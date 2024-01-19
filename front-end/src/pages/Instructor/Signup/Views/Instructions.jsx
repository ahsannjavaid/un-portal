import React from "react";
import { useNavigate } from "react-router-dom";

export default function Instructions() {
  const navigate = useNavigate();

  return (
    <>
      <p className="border b-primary p-3">
        Assalam-u-Alaikum! Respected teacher, write your Name, Email address,
        Password and <b>Subject</b> you offer so that we may register you in our
        record.
      </p>
      <p>
        <b>OR</b>
      </p>
      <p className="border b-primary p-3 mb-3">
        If in case you already have an account on <b>UN Portal</b>, then you can
        simply login by <i>clicking up the login button here</i>.
      </p>
      <div className="d-grid">
        <button
          onClick={() => navigate("/instructor-login")}
          className="btn btn-outline fw-bold mt-1"
          type="button"
          style={{ color: "#4D3189", borderColor: "#4D3189" }}
        >
          Login
        </button>
      </div>
    </>
  );
}
