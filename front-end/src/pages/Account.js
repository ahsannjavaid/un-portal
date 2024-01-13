import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../services/helper'
import Navbar from '../components/Navbar'

const Account = () => {

  const localEmail = localStorage.getItem('email')
  const [instructors, setInstructors] = useState([])
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subject, setSubject] = useState('')
  const [_id, set_id] = useState(0)

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
    getInstructors()
  }, [])

  const fillForm = () => {
    for (let i = 0; i < instructors.length; i++) {
      if (instructors[i].email === localEmail) {
        setFname(instructors[i].fname)
        setLname(instructors[i].lname)
        setEmail(instructors[i].email)
        setPassword(instructors[i].password)
        setSubject(instructors[i].subject)
        set_id(instructors[i]._id)
      }
    }
  }

  const UpdateInstructor = () => {
    fetch(`${BASE_URL}instructor-details/${_id}`, {
      method: 'put',
      body: JSON.stringify({ fname, lname, email, password, subject }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <>
      <Navbar
        tab={5}
        navNo={1} />
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-3 border-end pe-md-5 mb-4 mt-4'>
            <h3>
              <span className='d-grid badge bg-secondary mb-3'>ABOUT</span>
            </h3>
            <p className='border b-primary p-2 text-center' style={{ color: '#4D3189' }}>Click on <b>Show Info</b> button to see your about.<br /><b>NOTE: </b>You are not allowed to edit <i>Email address</i> and <i>Subject</i>!</p>
            <p><img style={{ marginRight: '11px' }} src='./images/name.png' alt='name' width='25px' height='22px' />{fname} {lname}</p>
            <p><img style={{ marginRight: '12px' }} src='./images/email.png' alt='emailaddress' width='23px' height='19px' />{email}</p>
            <p><img style={{ marginRight: '17px' }} src='./images/password.png' alt='password' width='18px' height='24px' /><b>{password}</b></p>
            <p><img style={{ marginRight: '16px' }} src='./images/subject.png' alt='subject' width='19px' height='22px' />{subject}</p>
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
                    <h6>Email address</h6>
                    <input type="email" value={email} className="form-control" />
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
                <h6>Subject</h6>
                <select className="form-select">
                  <option>{subject}</option>
                </select>
              </fieldset>
              <div className="d-grid mt-3">
                <button onClick={UpdateInstructor} className="btn btn-outline fw-bold" type="submit" style={{ color: '#4D3189', borderColor: '#4D3189' }}>UPDATE</button>
              </div>
            </form>
          </div>
        </div >
      </div >
    </>
  )
}

export default Account