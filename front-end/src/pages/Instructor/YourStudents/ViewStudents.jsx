import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../../components/Navbar";
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
  }, [instructorEmail]);

  function viewStudents() {
    setChoice(1);
  }

  function ViewRecord() {
    let a = 0, check = false;

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
    try {
      const data = await fetchResponse(studentEndpoints.deleteSingleStudent(id), 3, null)
      alert(data.message);
      if (data.success) {
        let duplicateArray = [...selectedStudents];
        setSelectedStudents(duplicateArray.filter(std => std.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (choice === 0) {
    return (
      <>
        <Navbar tab={3} navNo={1} />
        <div className="container text-center mt-5">
          <ViewOptions viewStudents={viewStudents} ViewRecord={ViewRecord} />
        </div>
      </>
    );
  } else if (choice === 1) {
    return (
      <>
        <Navbar tab={3} navNo={1} />
        <div className="container text-center mt-5">
          <div className="row">
            <div className="col col-6 text-start">
              <h4 className="fw-bold me-5">| YOUR STUDENTS</h4>
            </div>
            <div className="col text-end">
              <ViewOptions
                viewStudents={viewStudents}
                ViewRecord={ViewRecord}
              />
            </div>
          </div>
          <br />
          <StudentsActionTable
            selectedStudents={selectedStudents}
            DeleteStudent={DeleteStudent}
          />
        </div>
      </>
    );
  } else if (choice === 2) {
    return (
      <>
        <Navbar tab={3} navNo={1} />
        <div className="container text-center mt-5">
          <div className="row">
            <div className="col col-6 text-start">
              <h4 className="fw-bold me-5">| RECORD</h4>
            </div>
            <div className="col text-end">
              <ViewOptions
                viewStudents={viewStudents}
                ViewRecord={ViewRecord}
              />
            </div>
          </div>
          <br />
          <div className="mb-4">
            <ExamTypeNavigation
              ActivityNavDec={ActivityNavDec}
              ActivityNavInc={ActivityNavInc}
            />
          </div>
          <StudentsMarksTable examTypeArray={examTypeArray} />
        </div>
      </>
    );
  }
  if (!requiredMarks.length) {
    return (
      <>
        <Navbar tab={3} navNo={1} />
        <div className="container text-center">
          <h5 style={{ color: "red", marginTop: "2.5in" }}>No record found!</h5>
        </div>
      </>
    );
  }
};

export default ViewStudents;
