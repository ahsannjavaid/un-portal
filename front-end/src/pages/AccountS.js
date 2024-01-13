import React from 'react'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../services/helper'
import Navbar from '../components/Navbar'

const AccountS = () => {
  const localStudentID = localStorage.getItem('studentID')

  let studentSubjects = []
  let studentInstructorsObjects = []
  let studentsInstructorEmail = []

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [studentID, setStudentID] = useState()
  let [_id, set_id] = useState()
  const [password, setPassword] = useState('')
  const [students, setStudents] = useState([])
  const [instructors, setInstructors] = useState([])
  let [requiredInstructors, setRequiredInstructors] = useState([])

  const getStudents = async () => {
    let result = await fetch(`${BASE_URL}students-details`)
    result = await result.json()
    if (result) {
      setStudents(result)
    }
    else {
      console.log("Instructors-details not found!")
    }
  }

  const getInstructors = async () => {
    let result = await fetch(`${BASE_URL}instructors-details`)
    result = await result.json()
    if (result) {
      setInstructors(result)
    }
    else {
      console.log("Instructors-details not found!")
    }
  }

  useEffect(() => {
    getStudents()
    getInstructors()
  }, [])

  const fillForm = () => {
    let check = true
    for (let i = 0; i < students.length; i++) {
      if (students[i].studentID === parseInt(localStudentID)) {
        check = true
        setFname(students[i].fname)
        setLname(students[i].lname)
        setStudentID(students[i].studentID)
        setPassword(students[i].password)
        _id = students[i]._id
        set_id(_id)
        for (let j = 0; j < studentSubjects.length + 1; j++) {
          if (studentSubjects[j] === students[i].instructorSubject) {
            check = false
          }
        }
        if (check) {
          studentSubjects.push(students[i].instructorSubject)
          studentsInstructorEmail.push(students[i].instructorEmail)
        }
      }
    }
    // getting student's instructors name...
    let a = 0
    for (let u = 0; u < studentsInstructorEmail.length; u++) {
      for (let v = 0; v < instructors.length; v++) {
        if (studentsInstructorEmail[u] === instructors[v].email) {
          studentInstructorsObjects[a++] = { ...instructors[v] }
        }
      }
    }
    requiredInstructors = studentInstructorsObjects
    setRequiredInstructors(requiredInstructors)
  }

  const UpdateStudent = () => {
    fetch(`${BASE_URL}student-details/${_id}`, {
      method: 'put',
      body: JSON.stringify({ fname, lname, password, studentID }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    alert("Successfully updated!")
  }

  return (
    <>
      <Navbar
        tab={3}
        navNo={2} />
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-3 border-end pe-md-5 mb-4 mt-4'>
            <h3>
              <span className='d-grid badge bg-secondary mb-5'>ABOUT</span>
            </h3>
            <p className='border b-primary p-2 text-center mb-5' style={{ color: '#4D3189' }}>Click on <b>Show Info</b> button to see your about.<br /><b>NOTE: </b>You are not allowed to edit <i>Student ID</i>!</p>
            <p><img style={{ marginRight: '11px' }} src='./images/name.png' alt='name' width='25px' height='22px' />{fname} {lname}</p>
            <p><img style={{ marginRight: '12px' }} src='./images/email.png' alt='emailaddress' width='23px' height='19px' />{studentID}</p>
            <p><img style={{ marginRight: '17px' }} src='./images/password.png' alt='password' width='18px' height='24px' /><b>{password}</b></p>
            <div className="d-grid">
              <button onClick={fillForm} className="btn btn-outline fw-bold mt-3" type="button" style={{ color: '#4D3189', borderColor: '#4D3189' }}>Show Info</button>
            </div>
          </div>
          <div className='col-md-9 ps-md-5 mb-4 mt-4'>
            <form style={{ color: '#4D3189' }}>
              <h3>
                <span className='d-grid badge bg-secondary mb-4'>EDIT PANEL</span>
              </h3>
              <div className="row mb-3">
                <h6>Name</h6>
                <div className="col">
                  <input type="text" onChange={(event) => setFname(event.target.value)} value={fname} className="form-control" aria-label="First name" />
                </div>

                <div className="col">
                  <input type="text" onChange={(event) => setLname(event.target.value)} value={lname} className="form-control" aria-label="Last name" />
                </div>
              </div>
              <div className="row mb-3">
                <fieldset disabled>
                  <div>
                    <h6>Student ID</h6>
                    <input type="email" value={studentID} className="form-control" />
                  </div>
                </fieldset>
              </div>
              <div className="row mb-3">
                <div>
                  <h6>Password</h6>
                  <input type="password" onChange={(event) => setPassword(event.target.value)} value={password} className="form-control" />
                </div>
              </div>
              <fieldset disabled>
                <h6>Instructors and Subjects</h6>
                <select className="form-select">
                  {
                    requiredInstructors.map((x, ind) =>
                      <option key={ind}>{x.fname} {x.lname} - {x.subject}</option>
                    )
                  }
                </select>
              </fieldset>
              <div className="d-grid mt-3">
                <button onClick={UpdateStudent} className="btn btn-outline fw-bold" type="submit" style={{ color: '#4D3189', borderColor: '#4D3189' }}>UPDATE</button>
              </div>
            </form>
          </div>
        </div >
      </div >


      {/* <div className='container'>
        <div className='row mt-5'>
          <div className='col col-3 border-end'>
            <h4 className='text-center'>About</h4>
            <hr />
            <p className='border b-primary p-3 mb-5 mt-4' style={{ color: '#4D3189' }}>Click on <b>Show Info</b> button to see your about.<br /><b>NOTE: </b>You are not allowed to edit <i>Student ID</i>!</p>
            <p><img style={{ marginRight: '11px' }} src='./images/name.png' alt='name' width='25px' height='22px' />{fname} {lname}</p>
            <p><img style={{ marginRight: '12px' }} src='./images/id.png' alt='emailaddress' width='24px' height='19px' />{studentID}</p>
            <p><img style={{ marginRight: '17px' }} src='./images/password.png' alt='password' width='18px' height='24px' /><b>{password}</b></p>
            <div className="d-grid">
              <button onClick={fillForm} className="btn btn-outline fw-bold" type="button" style={{ color: '#4D3189', borderColor: '#4D3189', marginTop: '32.5px' }}>Show Info</button>
            </div>
          </div>
          <div className='col col-9'>
            <h4 className='text-center'>Edit Panel</h4>
            <hr />
            <form style={{ color: '#4D3189' }}>
              <div className='p-3'>
                <div className="row mb-3">
                  <h6>Name</h6>
                  <div className="col">
                    <input type="text" onChange={(event) => setFname(event.target.value)} value={fname} className="form-control" aria-label="First name" />
                  </div>
                  <div className="col">
                    <input type="text" onChange={(event) => setLname(event.target.value)} value={lname} className="form-control" aria-label="Last name" />
                  </div>
                </div>
                <div>
                  <div className="row mb-3">
                    <fieldset disabled>
                      <div>
                        <h6>Student ID</h6>
                        <input readOnly type="id" defaultValue={studentID} className="form-control" />
                      </div>
                    </fieldset>
                  </div>
                  <div className="row mb-3">
                    <div>
                      <h6>Password</h6>
                      <input type="password" onChange={(event) => setPassword(event.target.value)} value={password} className="form-control" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div>
                      <h6>Instructors and Subjects</h6>
                      <select className="form-select">
                        {
                          requiredInstructors.map((x, ind) =>
                            <option key={ind}>{x.fname} {x.lname} - {x.subject}</option>
                          )
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="d-grid mt-3">
                  <button onClick={UpdateStudent} className="btn btn-outline fw-bold" type="submit" style={{ color: '#4D3189', borderColor: '#4D3189' }}>UPDATE</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}

    </>
  )
}

export default AccountS