import React from "react";

export default function InstructorsTable({
  serialNum,
  instructorsPerPage,
  DeleteInstructor,
}) {
  return (
    <table className="table table-light table-striped table-sm border">
      <thead>
        <tr style={{ color: "#4D3189" }}>
          <th scope="col">Serial #</th>
          <th scope="col">Name</th>
          <th scope="col">Emial</th>
          <th scope="col">Subject</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {instructorsPerPage.map((x, ind) => (
          <tr key={ind}>
            <th scope="row" style={{ color: "#4D3189" }}>
              {serialNum++}
            </th>
            <td>
              {x.fname} {x.lname}
            </td>
            <td>{x.email}</td>
            <td>{x.subject}</td>
            <td>
              <button
                onClick={() => DeleteInstructor(x._id)}
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
        ))}
      </tbody>
    </table>
  );
}
