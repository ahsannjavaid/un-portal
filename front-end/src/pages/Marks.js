import React from 'react'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../services/helper'
import Navbar from '../components/Navbar'

const Marks = () => {
    const studentID = localStorage.getItem('studentID')

    let totPoints = 0, totMarks = 0, totWeightage = 0, totObtWeightage = 0
    let requiredExam = []
    let studentSubjects = []
    const [marks, setMarks] = useState([])
    const [students, setStudents] = useState([])
    const [recordSubject, setRecordSubject] = useState('')

    const getMarks = async () => {
        let result = await fetch(`${BASE_URL}marks-details`)
        if (result) {
            result = await result.json()
            setMarks(result)
        }
        else {
            console.log("Marks not found!")
        }
    }

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

    useEffect(() => {
        getMarks()
        getStudents()
    }, [])

    let a = 0, b = 0
    let check = true
    for (let i = 0; i < marks.length; i++) {

        for (let j = 0; j < marks[i].selectedStudents.length; j++) {
            if (marks[i].selectedStudents[j].studentID === parseInt(studentID)) {
                if (marks[i].instructorSubject === recordSubject) {
                    requiredExam[a] = { ...marks[i] }
                    requiredExam[a].weightage = requiredExam[a].weightage.toFixed(2)
                    requiredExam[a].selectedStudents = marks[i].selectedStudents[j].marks
                    requiredExam[a].obtWeightage = ((requiredExam[a].selectedStudents / requiredExam[a].points) * requiredExam[a].weightage).toFixed(2)
                    totMarks += requiredExam[a].selectedStudents
                    totPoints += requiredExam[a].points
                    totWeightage += parseFloat(requiredExam[a].weightage)
                    totObtWeightage += parseFloat(requiredExam[a].obtWeightage)
                    a++
                }
            }
        }
    }

    for (let k = 0; k < students.length; k++) {

        if (students[k].studentID === parseInt(studentID)) {

            check = true
            for (let l = 0; l < studentSubjects.length + 1; l++) {
                if (studentSubjects[l] === students[k].instructorSubject) {
                    check = false
                }
            }
            if (check) {
                studentSubjects[b++] = { ...students[k] }
            }
        }
    }

    if (recordSubject) {
        return (
            <>
                <Navbar
                tab = {2}
                navNo = {2}/>
                <div className='container mt-5 text-center'>
                    <h4 className='text text-start fw-bolder mb-4'>| YOUR RECORD</h4>
                    <div className='row'>
                        <div className='col'></div>
                        <div className='col col-4'>
                            <select onChange={(event) => setRecordSubject(event.target.value)} className="form-select mt-2 mb-4 text-center fw-bold border border-2" style={{ color: '#4D3189' }} aria-label="Default select example">
                                <option className='fw-bold'>Select Subject</option>
                                {
                                    studentSubjects.map((x, ind) =>
                                        <option key={ind} value={x.instructorSubject}>{x.instructorSubject}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className='col'></div>
                    </div>
                    <table className="table table-light table-striped table-sm border border-3">
                        <thead>
                            <tr style={{ color: '#4D3189' }}>
                                <th scope="col">Exam</th>
                                <th scope="col">Weightage</th>
                                <th scope="col">Obtained Weightage</th>
                                <th scope="col">Total Marks</th>
                                <th scope="col">Obtained Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requiredExam.map((x, ind) =>
                                    <tr key={ind}>
                                        <td><b>{x.examType} {x.activityNumber}</b></td>
                                        <td>{x.weightage}</td>
                                        <td style={{ color: '#4D3189' }}>{x.obtWeightage}</td>
                                        <td>{x.points}</td>
                                        <td style={{ color: '#4D3189' }}>{x.selectedStudents}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td style={{ color: '#4D3189' }}><b>TOTOL</b></td>
                                <td><b>{totWeightage.toFixed(2)}</b></td>
                                <td style={{ color: '#4D3189' }}>{totObtWeightage.toFixed(2)}</td>
                                <td><b>{totPoints}</b></td>
                                <td style={{ color: '#4D3189' }}>{totMarks}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </>
        )
    }

    if (requiredExam) {
        return (
            <>
                <Navbar
                tab = {2}
                navNo = {2}/>
                <div className='container mt-5 text-center'>
                    <h4 className='text text-start fw-bolder mb-4'>| YOUR RECORD</h4>
                    <div className='row'>
                        <div className='col'></div>
                        <div className='col col-4'>
                            <select onChange={(event) => setRecordSubject(event.target.value)} className="form-select mt-2 mb-4 text-center fw-bold border border-2" style={{ color: '#4D3189' }} aria-label="Default select example">
                                <option className='fw-bold'>Select Subject</option>
                                {
                                    studentSubjects.map((x, ind) =>
                                        <option key={ind} value={x.instructorSubject}>{x.instructorSubject}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className='col'></div>
                    </div>
                </div>
            </>
        )
    }

    if (!requiredExam) {
        return (
            <>
                <Navbar
                tab = {2}
                navNo = {2}/>
                <div className='container text-center'>
                    <h5 style={{ color: 'red', marginTop: '2.5in' }}>No record found!</h5>
                </div>
            </>
        )
    }
}

export default Marks