import React from "react";

export default function StudentsActionTable({
  selectedStudents,
  DeleteStudent,
}) {
  return (
    <table className="table table-light table-striped table-sm border">
      <thead>
        <tr style={{ color: "#4D3189" }}>
          <th scope="col">Serial #</th>
          <th scope="col">Name</th>
          <th scope="col">Student ID</th>
          <th scope="col">Delete</th>
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
                <button
                  onClick={() => DeleteStudent(x._id)}
                  className="btn pt-0 pb-0 ps-1 pe-1"
                >
                  <img
                    src="./images/delete.png"
                    alt="delete"
                    width={"20px"}
                    height={"20px"}
                  />
                </button>
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
