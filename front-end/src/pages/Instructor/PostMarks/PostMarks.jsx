import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../services/helper";
import Navbar from "../../../components/Navbar";
import CharacteristicsForm from "./Views/CharacteristicsForm";
import StudentsTable from "./Views/StudentsTable";

const PostMarks = () => {
  let obtWeightage = "";

  const instructorEmail = localStorage.getItem("email");
  const instructorSubject = localStorage.getItem("subject");

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [examType, setExamType] = useState("");
  const [activityNumber, setActivityNumber] = useState(null);
  const [weightage, setWeightage] = useState(null);
  const [points, setPoints] = useState(null);

  const getStudents = async () => {
    let result = await fetch(`${BASE_URL}students-details`);
    result = await result.json();
    if (result) {
      setStudents(result);
    } else {
      console.log("Check your Internet connection!");
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const viewStudents = () => {
    let a = 0;
    let duplciateArray = [];
    for (let i = 0; i < students.length; i++) {
      if (students[i].instructorEmail === instructorEmail) {
        duplciateArray[a++] = { ...students[i] };
      }
    }
    setSelectedStudents(duplciateArray);
  };

  const PostResult = async () => {
    if (examType && weightage && points && selectedStudents) {
      await fetch(`${BASE_URL}marks`, {
        method: "post",
        body: JSON.stringify({
          examType,
          weightage,
          obtWeightage,
          points,
          activityNumber,
          instructorEmail,
          instructorSubject,
          selectedStudents,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Successfully posted!");
      window.location.reload();
    } else {
      alert("Every field except Activity Number is mandatory!");
    }
  };

  return (
    <>
      <Navbar tab={4} navNo={1} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 pe-md-5 border-end">
            <h3>
              <span className="d-grid badge bg-secondary mb-4 mt-4">
                CHARACTERISTICS
              </span>
            </h3>
            <div style={{ color: "#4D3189" }}>
              <CharacteristicsForm
                setActivityNumber={setActivityNumber}
                setExamType={setExamType}
                setPoints={setPoints}
                setWeightage={setWeightage}
                viewStudents={viewStudents}
              />
            </div>
          </div>
          <div className="col-md-9 ps-md-5">
            <h3>
              <div className="row mb-4 mt-4">
                <div className="col-10">
                  <span className="d-grid badge bg-secondary">STUDENTS</span>
                </div>
                <div className="col-2 text-end d-grid">
                  <button
                    onClick={PostResult}
                    type="submit"
                    className="btn p-0 borderd fw-bold"
                    style={{
                      borderColor: "#4D3189",
                      borderWidth: "2px",
                      color: "#4D3189",
                    }}
                  >
                    POST
                  </button>
                </div>
              </div>
            </h3>
            <StudentsTable selectedStudents={selectedStudents} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostMarks;
