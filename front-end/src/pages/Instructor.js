import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../services/helper'

const Instructor = () => {

  const navigate = useNavigate()

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [subject, setSubject] = useState("")

  localStorage.clear()
  const registerInstructor = async () => {
    if (fname && lname && email && password && subject) {
      alert("You are registered successfully!");
      await fetch(`${BASE_URL}instructors`, {
        method: 'post',
        body: JSON.stringify({ fname, lname, email, password, subject }),
        headers: {
          "Content-Type": 'application/json'
        }
      })
      localStorage.setItem('firstName', fname)
      localStorage.setItem('email', email)
      localStorage.setItem('subject', subject)
      navigate("/instructor-interface");
      window.location.reload()
    }
    else {
      alert("You have to fill the form in order to register!")
    }
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
        <div className='row mt-5 mb-3' style={{ color: '#4D3189' }}>
          <div className='col-md-4 mt-4 text-center'>
            <p className='border b-primary p-3'>Assalam-u-Alaikum! Respected teacher, write your Name, Email address, Password and <b>Subject</b> you offer so that we may register you in our record.</p>
            <p><b>OR</b></p>
            <p className='border b-primary p-3 mb-3'>If in case you already have an account on <b>UN Portal</b>, then you can simply login by <i>clicking up the login button here</i>.</p>
            <div className='d-grid'>
              <button onClick={() => navigate("/instructor-login")} className="btn btn-outline fw-bold mt-1" type="button" style={{ color: '#4D3189', borderColor: '#4D3189' }}>Login</button>
            </div>
          </div>
          <div className='col-md-8'>
            <h3>
              <span className='d-grid badge bg-secondary mb-4 mt-4'>SIGN-UP</span>
            </h3>
            <form>
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
                  <div className='col'>
                    <h6>Email address</h6>
                    <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" placeholder='name@host.domain' />
                  </div>
                  <div className='col'>
                    <h6>Password</h6>
                    <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" />
                  </div>
                </div>
              </div>
              <h6>Subject</h6>
              <select onClick={(event) => setSubject(event.target.value)} className="form-select mt-2" aria-label="Default select example">
                <option>Not selected</option>
                <option value={"Islamiat"}>Islamiat</option>
                <option value={"Computer Science"}>Computer Science</option>
                <option value={"Biology"}>Biology</option>
                <option value={"Chemistry"}>Chemistry</option>
                <option value={"Physics"}>Physics</option>
                <option value={"English"}>English</option>
                <option value={"Urdu"}>Urdu</option>
                <option value={"Pakistan Studies"}>Pakistan Studies</option>
                <option value={"Mathematics"}>Mathematics</option>
              </select>
              <div className="d-grid mt-4">
                <button onClick={registerInstructor} className="btn btn-outline fw-bold" type="submit" style={{ color: '#4D3189', borderColor: '#4D3189' }}>REGISTER</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Instructor