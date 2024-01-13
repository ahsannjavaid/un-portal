import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../services/helper'
import Navbar from '../components/Navbar'

const PostMarks = () => {

    let obtWeightage = ""

    const instructorEmail = localStorage.getItem('email')
    const instructorSubject = localStorage.getItem('subject')

    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [examType, setExamType] = useState('')
    const [activityNumber, setActivityNumber] = useState(null)
    const [weightage, setWeightage] = useState(null)
    const [points, setPoints] = useState(null)

    const getStudents = async () => {
        let result = await fetch(`${BASE_URL}students-details`)
        result = await result.json()
        if (result) {
            setStudents(result)
        }
        else {
            console.log("Check your Internet connection!")
        }
    }

    useEffect(() => {
        getStudents()
    }, [])

    const viewStudents = () => {
        let a = 0
        let duplciateArray = []
        for (let i = 0; i < students.length; i++) {
            if (students[i].instructorEmail === instructorEmail) {
                duplciateArray[a++] = { ...students[i] }
            }
        }
        setSelectedStudents(duplciateArray)
    }

    const PostResult = async () => {
        if (examType && weightage && points && selectedStudents) {
            await fetch(`${BASE_URL}marks`, {
                method: 'post',
                body: JSON.stringify({ examType, weightage, obtWeightage, points, activityNumber, instructorEmail, instructorSubject, selectedStudents }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            alert("Successfully posted!")
            window.location.reload()
        }
        else {
            alert("Every field except Activity Number is mandatory!")
        }
    }

    return (
        <>
            <Navbar
                tab={4}
                navNo={1} />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-3 pe-md-5 border-end'>
                        <h3>
                            <span className='d-grid badge bg-secondary mb-4 mt-4'>CHARACTERISTICS</span>
                        </h3>
                        <div style={{ color: '#4D3189' }}>
                            <form className='mt-4'>
                                <h6>Exam Type</h6>
                                <select onChange={(event) => setExamType(event.target.value)} className="form-select mb-3" aria-label="Default select example">
                                    <option defaultValue={""}>Not selected</option>
                                    <option value={"Quiz"}>Quiz</option>
                                    <option value={"Assignment"}>Assignment</option>
                                    <option value={"Lab Work"}>Lab Work</option>
                                    <option value={"Class Participation"}>Class Participation</option>
                                    <option value={"Project"}>Project</option>
                                    <option value={"Sessional"}>Sessional</option>
                                    <option value={"Final"}>Final</option>
                                </select>
                                <h6>Activity Number</h6>
                                <input onChange={(event) => setActivityNumber(event.target.value)} type={"number"} className='form-control mb-3' />
                                <h6>Weightage (%)</h6>
                                <input onChange={(event) => setWeightage(event.target.value)} type={"number"} className='form-control mb-3' />
                                <h6>Points</h6>
                                <input onChange={(event) => setPoints(event.target.value)} type={"number"} className='form-control' />
                                <div className="d-grid mt-3">
                                    <button onClick={viewStudents} className="btn btn-outline fw-bold" type="button" style={{ color: '#4D3189', borderColor: '#4D3189' }}>Done</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-md-9 ps-md-5'>
                        <h3>
                            <div className='row mb-4 mt-4'>
                                <div className='col-10'>
                                    <span className='d-grid badge bg-secondary'>STUDENTS</span>
                                </div>
                                <div className='col-2 text-end d-grid'>
                                    <button onClick={PostResult} type='submit' className='btn p-0 borderd fw-bold' style={{ borderColor: '#4D3189', borderWidth: '2px', color: '#4D3189' }}>
                                        POST
                                    </button>
                                </div>
                            </div>
                        </h3>
                        <table className="table table-light table-striped table-sm border">
                            <thead>
                                <tr style={{ color: '#4D3189' }}>
                                    <th scope="col">Serial #</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Student ID</th>
                                    <th scope="col">Points Obtained</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedStudents.map((x, ind) =>
                                        <tr key={ind}>
                                            <th scope="row" style={{ color: '#4D3189' }}>{++ind}</th>
                                            <td>{x.fname} {x.lname}</td>
                                            <td>{x.studentID}</td>
                                            <td><input onChange={(event) => x.marks = event.target.value} type={'number'} /></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostMarks