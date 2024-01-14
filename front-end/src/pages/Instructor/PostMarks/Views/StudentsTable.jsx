import React from "react";

function StudentsTable({ selectedStudents }) {
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
        {selectedStudents.map((x, ind) => (
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
                onChange={(event) => (x.marks = event.target.value)}
                type={"number"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentsTable;
