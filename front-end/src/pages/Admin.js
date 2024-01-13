import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/helper'

const Admin = () => {

  const [instructors, setInstructors] = useState([])
  let [instructorsPerPage, setInstructorsPerPage] = useState([])
  let [pgNum, setPgNum] = useState(1)
  let [pgStart, setPgStart] = useState(0)
  let [pgEnd, setPgEnd] = useState(10)
  let [compensate, setCompensate] = useState(0)
  let [chk, setChk] = useState(true)
  let [serialNum, setSerialNum] = useState(1)

  const getInstructors = async () => {
    let result = await fetch(`${BASE_URL}instructors-details`)
    result = await result.json()
    if (result) {
      setInstructors(result)
    }
    else {
      console.log("Check your Internet connection!")
    }
  }

  useEffect(() => {
    getInstructors()
  }, [])

  const viewUsers = () => {
    setInstructorsPerPage(instructors.slice(pgStart, pgEnd))
  }

  const pageIncrement = () => {
    if (pgStart + 10 < instructors.length) {
      pgStart += 10
    }
    if (pgEnd + 10 < instructors.length) {
      pgEnd += 10
    }
    else {
      if (chk) {
        pgEnd += 10
        compensate = pgEnd - instructors.length
        pgEnd -= compensate
        setCompensate(compensate)
        setChk(false)
      }
    }
    setSerialNum(pgStart + 1)
    setPgNum((pgStart + 10) / 10)
    setPgStart(pgStart)
    setPgEnd(pgEnd)
    setInstructorsPerPage(instructors.slice(pgStart, pgEnd))
  }

  const pageDecrement = () => {

    if (pgStart > 0) {
      pgStart -= 10
    }
    if (pgEnd > 10) {
      pgEnd -= (10 - compensate)
      setCompensate(0)
    }
    setSerialNum(pgStart + 1)
    setChk(true)
    setPgNum((pgStart + 10) / 10)
    setPgStart(pgStart)
    setPgEnd(pgEnd)
    setInstructorsPerPage(instructors.slice(pgStart, pgEnd))
  }

  const DeleteInstructor = (id) => {
    fetch(`${BASE_URL}instructor-details/${id}`, {
      method: 'delete',
    })
    alert("Successfully deleted!")
    window.location.reload()
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='text-center'>
              <Link to={"/"}>
                <img className='img mt-4 mb-2' src='./images/logo_0.0.png' alt='logo' height='30px' width='120px' />
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-6'>
            <h4 className='text-start fw-bolder mb-5 mt-2'>
              <span style={{ color: 'red' }}>Secret Page</span> | Instructors' Information
            </h4>
          </div>
          <div className='col-6 text-end'>
            <button onClick={viewUsers} className='btn' style={{ backgroundColor: '#4D3189', color: 'white' }}>
              View Users
            </button>
          </div>
        </div>
        <table className="table table-light table-striped table-sm border">
          <thead>
            <tr style={{ color: '#4D3189' }}>
              <th scope="col">Serial #</th>
              <th scope="col">Name</th>
              <th scope="col">Emial</th>
              <th scope="col">Subject</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              instructorsPerPage.map((x, ind) =>
                <tr key={ind}>
                  <th scope="row" style={{ color: '#4D3189' }}>{serialNum++}</th>
                  <td>{x.fname} {x.lname}</td>
                  <td>{x.email}</td>
                  <td>{x.subject}</td>
                  <td><button onClick={() => DeleteInstructor(x._id)} className='btn pt-0 pb-0 ps-1 pe-1'><img src='./images/delete.png' alt='delete' width={"20px"} height={"20px"} /></button></td>
                </tr>
              )
            }
          </tbody>
        </table>
        <div className='text-center'>
          <button onClick={pageDecrement} className='btn btn-sm btn-outline fw-bolder' style={{ color: '#4D3189', borderColor: '#4D3189' }}>
            «
          </button>
          <span className='ms-2 me-2'>{pgNum}</span>
          <button onClick={pageIncrement} className='btn btn-sm btn-outline fw-bolder' style={{ color: '#4D3189', borderColor: '#4D3189' }}>
            »
          </button>
        </div>
      </div>
    </>
  )
}

export default Admin