import React from "react";

function StudentsTable({ selectedStudents, points }) {
  return (
    <table className="table table-light table-striped table-sm border">
      <thead>
        <tr style={{ color: "#4D3189" }}>
          <th scope="col">Serial #</th>
          <th scope="col">Name</th>
          <th scope="col">Student ID</th>
          <th scope="col">Points Obtained</th>
        </tr>
      </thead>
      <tbody>
        {selectedStudents.length ? (
          selectedStudents.map((x, ind) => (
            <tr key={ind}>
              <th scope="row" style={{ color: "#4D3189" }}>
                {++ind}
              </th>
              <td>
                {x.fname} {x.lname}
              </td>
              <td>{x.studentID}</td>
              <td>
                <input
                  onChange={(event) => (x.marks = event.target.value > points ? 90 : event.target.value < 0 ? 0 : event.target.value)}
                  type={"number"}
                  min={0}
                  max={points}
                />
              </td>
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

export default StudentsTable;
