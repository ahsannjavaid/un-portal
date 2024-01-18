import React from "react";

export default function SubjectNavigation({
  studentSubjects,
  setRecordSubject,
}) {
  return (
    <select
      onChange={(event) => setRecordSubject(event.target.value)}
      className="form-select mt-2 mb-4 text-center fw-bold border border-2"
      style={{ color: "#4D3189" }}
      aria-label="Default select example"
    >
      <option className="fw-bold" value={""}>Select Subject</option>
      {studentSubjects.map((subject, ind) => (
        <option key={ind} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  );
}
