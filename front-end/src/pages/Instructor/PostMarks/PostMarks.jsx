import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import LoadingSpinner from "../../../components/LoadingSpinner";
import CharacteristicsForm from "./Views/CharacteristicsForm";
import StudentsTable from "./Views/StudentsTable";
import { fetchResponse } from "../../../services/service";
import { examEndpoints } from "../../../services/endpoints/examEndpoints";
import { studentEndpoints } from "../../../services/endpoints/studentEndpoints";

const PostMarks = () => {
  let obtWeightage = "";

  const instructorEmail = localStorage.getItem("email");
  const instructorSubject = localStorage.getItem("subject");

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [examType, setExamType] = useState("");
  const [activityNumber, setActivityNumber] = useState(null);
  const [weightage, setWeightage] = useState(null);
  const [points, setPoints] = useState(null);
  const [showingStudents, setShowingStudents] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStudents = async () => {
      setIsLoading(true);
      try {
        const data = await fetchResponse(
          studentEndpoints.getParticularStudents(instructorEmail),
          0,
          null
        );
        setSelectedStudents(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getStudents()
    setIsLoading(false);
  }, [instructorEmail]);

  const PostResult = async () => {
    setIsLoading(true);
    try {
      const data = await fetchResponse(examEndpoints.postMarks(), 1, {
        examType,
        weightage,
        obtWeightage,
        points,
        activityNumber,
        instructorEmail,
        instructorSubject,
        selectedStudents,
      });
      alert(data.message);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if(isLoading) return <LoadingSpinner />

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
                viewStudents={() => setShowingStudents(true)}
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
            {showingStudents ? <StudentsTable selectedStudents={selectedStudents} points={points} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostMarks;
