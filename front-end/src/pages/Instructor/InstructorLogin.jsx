import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../services/helper'
import LoginForm from './Views/LoginForm'

const InstructorLogin = () => {
  const navigate = useNavigate()
  
  const [instructors, setInstructors] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let [check, setCheck] = useState(true)

  const getInstructors = async () => {
    let result = await fetch(`${BASE_URL}instructors-details`)
    result = await result.json()
    if (result) {
      setInstructors(result)
    }
    else {
      console.log("Instructors not found!")
    }
  }

  useEffect(() => {
    getInstructors()
  }, [])

  const loginCheck = () => {
    for (let i = 0; i < instructors.length; i++) {
      if (instructors[i].email === email && instructors[i].password === password) {
        localStorage.setItem('firstName', instructors[i].fname)
        localStorage.setItem('email', instructors[i].email)
        localStorage.setItem('subject', instructors[i].subject)
        check = false
        setCheck(check)
        navigate("/instructor-interface");
      }
    }
    if (check) {
      alert("Incorrect Credentials!")
    }
  }

  return (
    <>
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
        <h4 className='text text-start mt-4 mb-5'>| Instructor LOGIN</h4>
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters mt-0">
                  <div className="col-lg-6">
                    <div className="p-5 border" style={{ color: '#4D3189' }}>
                      <LoginForm 
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        loginCheck={loginCheck}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right" />
                      <div className="account-testimonial">
                        <h4 className="text-white mb-4">A Teacher</h4>
                        <p className="lead text-white"><i>"Everything seeks forgiveness for the teacher of virtue, even fish in the sea."</i></p>
                        <p>- Prophet Muhammad (PBUH)</p>
                        <p>(Musnad al-Bazzar)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InstructorLogin