import React from "react";

export default function ViewOptions({ viewStudents, ViewRecord }) {
  return (
    <>
      <button
        onClick={viewStudents}
        className="btn me-2"
        style={{ backgroundColor: "#4D3189", color: "white" }}
      >
        Students
      </button>
      <button
        onClick={ViewRecord}
        className="btn ms-2"
        style={{ backgroundColor: "#4D3189", color: "white" }}
      >
        Record
      </button>
    </>
  );
}
