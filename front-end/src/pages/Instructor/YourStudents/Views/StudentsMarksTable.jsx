import React from "react";

export default function StudentsMarksTable({ examTypeArray }) {
  return (
    <table className="table table-light table-striped table-sm border text-center">
      <thead>
        <tr style={{ color: "#4D3189" }}>
          <th scope="col">Serial #</th>
          <th scope="col">Student ID</th>
          <th scope="col">Student Name</th>
          {
            <th scope="col" style={{ color: "black", fontWeight: "normal" }}>
              (TW:{" "}
              <span style={{ color: "#4D3189" }}>
                {examTypeArray.weightage}
              </span>
              ){" "}
              <b>
                {examTypeArray.examType} {examTypeArray.activityNumber}
              </b>{" "}
              (TM:{" "}
              <span style={{ color: "#4D3189" }}>{examTypeArray.points}</span>)
            </th>
          }
        </tr>
      </thead>
      <tbody>
        {examTypeArray.selectedStudents.length ? (
          examTypeArray.selectedStudents.map((x, ind) => (
            <tr key={ind}>
              <th scope="row" style={{ color: "#4D3189" }}>
                {++ind}
              </th>
              <td>{x.studentID}</td>
              <td>
                {x.fname} {x.lname}
              </td>
              <td>{x.marks}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>No record found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
