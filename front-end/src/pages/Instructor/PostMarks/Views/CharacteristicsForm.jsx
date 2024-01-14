import React from "react";

export default function CharacteristicsForm({
  setExamType,
  setActivityNumber,
  setWeightage,
  setPoints,
  viewStudents,
}) {
  return (
    <form className="mt-4">
      <h6>Exam Type</h6>
      <select
        onChange={(event) => setExamType(event.target.value)}
        className="form-select mb-3"
        aria-label="Default select example"
      >
        <option defaultValue={""}>Not selected</option>
        <option value={"Quiz"}>Quiz</option>
        <option value={"Assignment"}>Assignment</option>
        <option value={"Lab Work"}>Lab Work</option>
        <option value={"Class Participation"}>Class Participation</option>
        <option value={"Project"}>Project</option>
        <option value={"Sessional"}>Sessional</option>
        <option value={"Final"}>Final</option>
      </select>
      <h6>Activity Number</h6>
      <input
        onChange={(event) => setActivityNumber(event.target.value)}
        type={"number"}
        className="form-control mb-3"
      />
      <h6>Weightage (%)</h6>
      <input
        onChange={(event) => setWeightage(event.target.value)}
        type={"number"}
        className="form-control mb-3"
      />
      <h6>Points</h6>
      <input
        onChange={(event) => setPoints(event.target.value)}
        type={"number"}
        className="form-control"
      />
      <div className="d-grid mt-3">
        <button
          onClick={viewStudents}
          className="btn btn-outline fw-bold"
          type="button"
          style={{ color: "#4D3189", borderColor: "#4D3189" }}
        >
          Done
        </button>
      </div>
    </form>
  );
}
