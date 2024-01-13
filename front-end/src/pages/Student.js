import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../services/helper'

const Student = () => {
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [studentID, setStudentID] = useState('')
  const [password, setPassword] = useState("")
  let [check, setCheck] = useState(true)

  localStorage.clear()

  const getStudents = async () => {
    let result = await fetch(`${BASE_URL}students-details`)
    if (result) {
      result = await result.json()
      setStudents(result)
    }
    else {
      console.log("Marks not found!")
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  const CheckStudent = () => {
    for (let i = 0; i < students.length; i++) {
      if (students[i].studentID === parseInt(studentID)) {
        if (students[i].password === password) {
          localStorage.setItem('fname', students[i].fname)
          localStorage.setItem('studentID', students[i].studentID)
          check = false
          setCheck(check)
          navigate('/student-interface')
        }
      }
    }
    if (check) {
      alert("Incorrect credentials!")
    }
  }

  return (
    <div className="container">
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
      <h4 className='text text-start mt-4 mb-5'>| Student LOGIN</h4>
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card border-0">
            <div className="card-body p-0">
              <div className="row no-gutters mt-0">
                <div className="col-lg-6">
                  <div className="p-5 border" style={{ color: '#4D3189' }}>
                    <form>
                      <div className="form-group">
                        <h6>Student ID</h6>
                        <input onChange={(event) => setStudentID(event.target.value)} value={studentID} type="number" className="form-control mb-3" placeholder='9999' />
                      </div>
                      <div className="form-group mb-5">
                        <h6>Password</h6>
                        <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" />
                      </div>
                      <div className="d-grid mt-3">
                        <button onClick={CheckStudent} className="btn btn-outline fw-bold" type="button" style={{ color: '#4D3189', borderColor: '#4D3189' }}>LOGIN</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-none d-lg-inline-block">
                  <div className="account-block rounded-right">
                    <div className="overlay rounded-right" />
                    <div className="account-testimonial">
                      <p className="lead text-white"><i>"The seeking of knowledge is obligatory for every Muslim."</i></p>
                      <p>- Prophet Muhammad (PBUH)</p>
                      <p>(Al-Tirmidhi, Hadith 74)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Student