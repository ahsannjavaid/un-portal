import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ExamTypeNavigation from "./Views/ExamTypeNavigation";
import StudentsMarksTable from "./Views/StudentsMarksTable";
import StudentsActionTable from "./Views/StudentsActionTable";
import ViewOptions from "./Views/ViewOptions";
import { fetchResponse } from "../../../services/service";
import { studentEndpoints } from "../../../services/endpoints/studentEndpoints";
import { examEndpoints } from "../../../services/endpoints/examEndpoints";

const ViewStudents = () => {
  const instructorEmail = localStorage.getItem("email");

  const [selectedStudents, setSelectedStudents] = useState([]);
  let [marks, setMarks] = useState([]);
  const [requiredMarks, setRequiredMarks] = useState([]);
  let [examTypeArray, setExamTypeArray] = useState([]);
  const [choice, setChoice] = useState(0);
  let [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStudents() {
      try {
        const data = await fetchResponse(
          studentEndpoints.getParticularStudents(instructorEmail),
          0,
          null
        );
        setSelectedStudents(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getMarks() {
      try {
        const data = await fetchResponse(
          examEndpoints.getParticularMarks(instructorEmail),
          0,
          null
        );
        setMarks(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStudents();
    getMarks();
    setIsLoading(false);
  }, [instructorEmail]);

  function viewStudents() {
    setChoice(1);
  }

  function ViewRecord() {
    let a = 0,
      check = false;

    for (let i = 0; i < marks.length; i++) {
      requiredMarks[a] = { ...marks[i] };
      for (let j = 0; j < requiredMarks[a].selectedStudents.length; j++) {
        check = false;
        for (let k = 0; k < selectedStudents.length; k++) {
          if (
            requiredMarks[a].selectedStudents[j].studentID ===
            selectedStudents[k].studentID
          ) {
            check = true;
            break;
          }
        }
        if (!check) {
          // deleting element from array... splice(ind,howMany)
          requiredMarks[a].selectedStudents.splice(j, 1);
        }
      }
      a++;
    }
    if (requiredMarks.length) {
      setRequiredMarks(requiredMarks);
      setExamTypeArray({ ...requiredMarks[index] });
      setChoice(2);
    }
  }

  const ActivityNavDec = () => {
    if (index > 0) {
      index--;
    }
    setIndex(index);
    examTypeArray = { ...requiredMarks[index] };
    setExamTypeArray(examTypeArray);
  };

  const ActivityNavInc = () => {
    if (index < requiredMarks.length - 1) {
      index++;
    }
    setIndex(index);
    examTypeArray = { ...requiredMarks[index] };
    setExamTypeArray(examTypeArray);
  };

  const DeleteStudent = async (id) => {
    setIsLoading(true);
    try {
      const data = await fetchResponse(
        studentEndpoints.deleteSingleStudent(id),
        3,
        null
      );
      if (data.success) {
        let duplicateArray = [...selectedStudents];
        setSelectedStudents(duplicateArray.filter((std) => std._id !== id));
      }
      alert(data.message);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Navbar tab={3} navNo={1} />
      <div className="container text-center mt-3 vh-100">
        <ViewOptions viewStudents={viewStudents} ViewRecord={ViewRecord} />
        {choice === 1 ? (
          <div>
            <h4 className="fw-bold me-5 mb-3 text-start">| YOUR STUDENTS</h4>
            <StudentsActionTable
              selectedStudents={selectedStudents}
              DeleteStudent={DeleteStudent}
            />
          </div>
        ) : choice === 2 ? (
          <div>
            <h4 className="fw-bold me-5 text-start">| RECORD</h4>
            <div className="mb-4">
              <ExamTypeNavigation
                ActivityNavDec={ActivityNavDec}
                ActivityNavInc={ActivityNavInc}
              />
            </div>
            <StudentsMarksTable examTypeArray={examTypeArray} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ViewStudents;
