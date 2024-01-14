import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../../services/helper";
import InstructorsTable from "./Views/InstructorsTable";
import PaginationNavigation from "./Views/PaginationNavigation";
import Header from "../../components/Header";

const Admin = () => {
  const [instructors, setInstructors] = useState([]);
  let [instructorsPerPage, setInstructorsPerPage] = useState([]);
  let [pgNum, setPgNum] = useState(1);
  let [pgStart, setPgStart] = useState(0);
  let [pgEnd, setPgEnd] = useState(10);
  let [compensate, setCompensate] = useState(0);
  let [chk, setChk] = useState(true);
  let [serialNum, setSerialNum] = useState(1);

  const getInstructors = async () => {
    let result = await fetch(`${BASE_URL}instructors-details`);
    result = await result.json();
    if (result) {
      setInstructors(result);
    } else {
      console.log("Check your Internet connection!");
    }
  };

  useEffect(() => {
    getInstructors();
  }, []);

  const viewUsers = () => {
    setInstructorsPerPage(instructors.slice(pgStart, pgEnd));
  };

  const pageIncrement = () => {
    if (pgStart + 10 < instructors.length) {
      pgStart += 10;
    }
    if (pgEnd + 10 < instructors.length) {
      pgEnd += 10;
    } else {
      if (chk) {
        pgEnd += 10;
        compensate = pgEnd - instructors.length;
        pgEnd -= compensate;
        setCompensate(compensate);
        setChk(false);
      }
    }
    setSerialNum(pgStart + 1);
    setPgNum((pgStart + 10) / 10);
    setPgStart(pgStart);
    setPgEnd(pgEnd);
    setInstructorsPerPage(instructors.slice(pgStart, pgEnd));
  };

  const pageDecrement = () => {
    if (pgStart > 0) {
      pgStart -= 10;
    }
    if (pgEnd > 10) {
      pgEnd -= 10 - compensate;
      setCompensate(0);
    }
    setSerialNum(pgStart + 1);
    setChk(true);
    setPgNum((pgStart + 10) / 10);
    setPgStart(pgStart);
    setPgEnd(pgEnd);
    setInstructorsPerPage(instructors.slice(pgStart, pgEnd));
  };

  const DeleteInstructor = (id) => {
    fetch(`${BASE_URL}instructor-details/${id}`, {
      method: "delete",
    });
    alert("Successfully deleted!");
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-6">
            <h4 className="text-start fw-bolder mb-5 mt-2">
              <span style={{ color: "red" }}>Secret Page</span> | Instructors'
              Information
            </h4>
          </div>
          <div className="col-6 text-end">
            <button
              onClick={viewUsers}
              className="btn"
              style={{ backgroundColor: "#4D3189", color: "white" }}
            >
              View Users
            </button>
          </div>
        </div>
        <InstructorsTable
          serialNum={serialNum}
          instructorsPerPage={instructorsPerPage}
          DeleteInstructor={DeleteInstructor}
        />
        <PaginationNavigation
          pgNum={pgNum}
          pageDecrement={pageDecrement}
          pageIncrement={pageIncrement}
        />
      </div>
    </>
  );
};

export default Admin;
