import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../services/helper'
import LoginForm from './Views/LoginForm'
import Header from '../../../components/Header'

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
      <Header />
      <h4 className='text text-start mt-4 mb-5'>| Student LOGIN</h4>
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card border-0">
            <div className="card-body p-0">
              <div className="row no-gutters mt-0">
                <div className="col-lg-6">
                  <div className="p-5 border" style={{ color: '#4D3189' }}>
                    <LoginForm 
                      studentID={studentID}
                      setStudentID={setStudentID}
                      password={password}
                      setPassword={setPassword}
                      CheckStudent={CheckStudent}
                    />
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