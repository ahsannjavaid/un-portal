import React from "react";

export default function ExamTypeNavigation({ ActivityNavDec, ActivityNavInc }) {
  return (
    <>
      <button
        onClick={ActivityNavDec}
        className="btn btn-sm btn-outline fw-bolder me-2"
        style={{ color: "#4D3189", borderColor: "#4D3189" }}
      >
        «
      </button>
      <span className="fw-bold">EXAM TYPE</span>
      <button
        onClick={ActivityNavInc}
        className="btn btn-sm btn-outline fw-bolder ms-2"
        style={{ color: "#4D3189", borderColor: "#4D3189" }}
      >
        »
      </button>
    </>
  );
}
