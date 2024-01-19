import React, { useState } from "react";
import { useEffect } from "react";
import InstructorsTable from "./Views/InstructorsTable";
import PaginationNavigation from "./Views/PaginationNavigation";
import Header from "../../components/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import { fetchResponse } from "../../services/service";
import { instructorEndpoints } from "../../services/endpoints/instructorEndpoints";

const Admin = () => {
  const [instructors, setInstructors] = useState([]);
  let [instructorsPerPage, setInstructorsPerPage] = useState([]);
  let [pgNum, setPgNum] = useState(1);
  let [pgStart, setPgStart] = useState(0);
  let [pgEnd, setPgEnd] = useState(10);
  let [compensate, setCompensate] = useState(0);
  let [chk, setChk] = useState(true);
  let [serialNum, setSerialNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInstructors = async () => {
      try {
        const data = await fetchResponse(
          instructorEndpoints.getInstructors(),
          0,
          null
        );
        if (data.success) {
          setInstructors(data.data);
          setInstructorsPerPage(data.data.slice(pgStart, pgEnd));
        }
        alert(data.message);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getInstructors();
    // eslint-disable-next-line
  }, []);

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

  const DeleteInstructor = async (id) => {
    setIsLoading(true);
    try {
      const data = await fetchResponse(
        instructorEndpoints.deleteInstructor(id),
        3,
        null
      );
      if (data.success) {
        let duplicateArray = [...instructorsPerPage];
        setInstructorsPerPage(duplicateArray.filter((instructor) => instructor._id !== id));
        let duplicateArray2 = [...instructors];
        setInstructors(duplicateArray2.filter((instructor) => instructor._id !== id));
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
      <div className="container">
        <Header />
        <h4 className="text-start fw-bolder mb-5 mt-2">
          <span style={{ color: "red" }}>Secret Page</span> | Instructors'
          Information
        </h4>
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
