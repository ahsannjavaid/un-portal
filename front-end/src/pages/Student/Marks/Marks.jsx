import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import SubjectNavigation from "./Views/SubjectNavigation";
import StudentMarksTable from "./Views/StudentMarksTable";
import { fetchResponse } from "../../../services/service";
import { studentEndpoints } from "../../../services/endpoints/studentEndpoints";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Marks = () => {
  const studentID = localStorage.getItem("studentID");

  const [exams, setExams] = useState([]);
  const [recordSubject, setRecordSubject] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getExams() {
      try {
        const data = await fetchResponse(
          studentEndpoints.getMarksOfParticularStudent(studentID),
          0,
          null
        );
        if (data.success) {
          setExams(data.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    getExams();
  }, [studentID]);

  if(isLoading) return <LoadingSpinner />

  return (
    <>
      <Navbar tab={2} navNo={2} />
      <div className="container mt-5 text-center">
        <h4 className="text text-start fw-bolder mb-4">| YOUR RECORD</h4>
        <div className="row">
          <div className="col"></div>
          <div className="col col-4">
            <SubjectNavigation
              studentSubjects={[
                ...new Set(exams.map((subject) => subject.instructorSubject)),
              ]}
              setRecordSubject={setRecordSubject}
            />
          </div>
          <div className="col"></div>
        </div>
        {recordSubject ? (
          <StudentMarksTable
            requiredExam={exams.filter(x => x.instructorSubject === recordSubject)}
            totWeightage={exams.reduce((accumulator, mark) => {
              if (mark.instructorSubject === recordSubject) {
                return accumulator + mark.weightage;
              } else {
                return accumulator;
              }
            }, 0)}
            totObtWeightage={exams.reduce((accumulator, mark) => {
              if (mark.instructorSubject === recordSubject) {
                return (
                  accumulator + (mark.marks * mark.weightage) / mark.points
                );
              } else {
                return accumulator;
              }
            }, 0)}
            totPoints={exams.reduce((accumulator, mark) => {
              if (mark.instructorSubject === recordSubject) {
                return accumulator + mark.points;
              } else {
                return accumulator;
              }
            }, 0)}
            totMarks={exams.reduce((accumulator, mark) => {
              if (mark.instructorSubject === recordSubject) {
                return accumulator + mark.marks;
              } else {
                return accumulator;
              }
            }, 0)}
          />
        ) : null}
      </div>
    </>
  );
};

export default Marks;
