import React from "react";

export default function StudentMarksTable({
  requiredExam,
  totWeightage,
  totObtWeightage,
  totPoints,
  totMarks,
}) {
  return (
    <table className="table table-light table-striped table-sm border border-3">
      <thead>
        <tr style={{ color: "#4D3189" }}>
          <th scope="col">Exam</th>
          <th scope="col">Weightage</th>
          <th scope="col">Obtained Weightage</th>
          <th scope="col">Total Marks</th>
          <th scope="col">Obtained Marks</th>
        </tr>
      </thead>
      <tbody>
        {requiredExam.map((x, ind) => (
          <tr key={ind}>
            <td>
              <b>
                {x.examType} {x.activityNumber}
              </b>
            </td>
            <td>{x.weightage.toFixed(2)}</td>
            <td style={{ color: "#4D3189" }}>{(x.marks * x.weightage / x.points).toFixed(2)}</td>
            <td>{x.points}</td>
            <td style={{ color: "#4D3189" }}>{x.marks ?? "-"}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td style={{ color: "#4D3189" }}>
            <b>TOTOL</b>
          </td>
          <td>
            <b>{totWeightage.toFixed(2)}</b>
          </td>
          <td style={{ color: "#4D3189" }}>{totObtWeightage.toFixed(2)}</td>
          <td>
            <b>{totPoints}</b>
          </td>
          <td style={{ color: "#4D3189" }}>{totMarks}</td>
        </tr>
      </tfoot>
    </table>
  );
}
