import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../services/helper'
import Navbar from '../components/Navbar'

const AddStudent = () => {

  const navigate = useNavigate()

  const instructorEmail = localStorage.getItem('email')
  const instructorSubject = localStorage.getItem('subject')

  let marks = ""
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [studentID, setStudentID] = useState('')
  const [password, setPassword] = useState('')

  const registerStudent = async () => {
    if (fname && studentID && password && instructorEmail) {
      alert("Successfully registered!")
      navigate('/view-students')
      await fetch(`${BASE_URL}students`, {
        method: 'post',
        body: JSON.stringify({ fname, lname, studentID, password, instructorEmail, instructorSubject, marks }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    else {
      alert("You have to fill the form in order to register student!")
    }
  }

  return (
    <>
      <Navbar 
      tab = {2}
      navNo = {1}/>
      <div className='container mt-5'>
        <h4 className='text text-start fw-bolder mb-4'>| REGISTER STUDENT</h4>
        <form>
          <div className='border-start border-top border-end primary p-3' style={{ color: '#4D3189' }}>
            <div className="row mb-3">
              <h6>Name</h6>
              <div className="col">
                <input onChange={(event) => setFname(event.target.value)} value={fname} type="text" className="form-control" placeholder="First name" aria-label="First name" />
              </div>
              <div className="col">
                <input onChange={(event) => setLname(event.target.value)} value={lname} type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
              </div>
            </div>
            <div>
              <div className="row mb-3">
                <div>
                  <h6>Student ID</h6><p className='fst-italic fw-light'>(Assign a Unique ID)</p>
                  <input onChange={(event) => setStudentID(event.target.value)} value={studentID} type="number" className="form-control" placeholder='9999' />
                </div>
              </div>
              <div className="row mb-3">
                <div>
                  <h6>Password</h6><p className='fst-italic fw-light'>(Assign a Password)</p>
                  <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="d-grid mt-3">
            <button onClick={registerStudent} className="btn btn-outline fw-bold" type="submit" style={{ color: '#4D3189', borderColor: '#4D3189' }}>ADD</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddStudent