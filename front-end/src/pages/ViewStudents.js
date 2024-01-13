import React, { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../services/helper'
import Navbar from '../components/Navbar'

const ViewStudents = () => {

    const instructorEmail = localStorage.getItem('email')

    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    let [marks, setMarks] = useState([])
    const [requiredMarks, setRequiredMarks] = useState([])
    let [examTypeArray, setExamTypeArray] = useState([])
    const [choice, setChoice] = useState(0)
    let [index, setIndex] = useState(0)

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

    useEffect(() => {
        getStudents()
        getMarks()
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
        setChoice(1)
    }

    const ViewRecord = () => {
        let a = 0, z = 0, check = false
        let duplciateArray = []

        for (let i = 0; i < students.length; i++) {
            if (students[i].instructorEmail === instructorEmail) {
                duplciateArray[z++] = { ...students[i] }
            }
        }
        setSelectedStudents(duplciateArray)

        for (let i = 0; i < marks.length; i++) {
            if (marks[i].instructorEmail === instructorEmail) {
                requiredMarks[a] = { ...marks[i] }
                for (let j = 0; j < requiredMarks[a].selectedStudents.length; j++) {
                    check = false
                    for (let k = 0; k < duplciateArray.length; k++) {
                        if (requiredMarks[a].selectedStudents[j].studentID === duplciateArray[k].studentID) {
                            check = true
                            break
                        }
                    }
                    if (!check) {
                        // deleting element from array... splice(ind,howMany)
                        requiredMarks[a].selectedStudents.splice(j, 1)
                    }
                }
                a++
            }
        }
        if (requiredMarks.length) {
            setRequiredMarks(requiredMarks)
            examTypeArray = { ...requiredMarks[index] }
            setExamTypeArray(examTypeArray)
            setChoice(2)
        }
    }

    const ActivityNavDec = () => {
        if (index > 0) {
            index--
        }
        setIndex(index)
        examTypeArray = { ...requiredMarks[index] }
        setExamTypeArray(examTypeArray)
    }

    const ActivityNavInc = () => {
        if (index < requiredMarks.length - 1) {
            index++
        }
        setIndex(index)
        examTypeArray = { ...requiredMarks[index] }
        setExamTypeArray(examTypeArray)
    }

    const DeleteStudent = (id) => {
        fetch(`${BASE_URL}student-details/${id}`, {
            method: 'delete'
        })
        alert("Successfully deleted!")
        window.location.reload()
    }

    if (choice === 0) {
        return (
            <>
                <Navbar 
                tab = {3}
                navNo = {1}/>
                <div className='container text-center mt-5'>
                    <button onClick={viewStudents} className='btn me-2' style={{ backgroundColor: '#4D3189', color: 'white' }}>
                        Students
                    </button>
                    <button onClick={ViewRecord} className='btn ms-2' style={{ backgroundColor: '#4D3189', color: 'white' }}>
                        Record
                    </button>
                </div>
            </>
        )
    }
    else if (choice === 1) {
        return (
            <>
                <Navbar 
                tab = {3}
                navNo = {1}/>
                <div className='container text-center mt-5'>
                    <div className='row'>
                        <div className='col col-6 text-start'>
                            <h4 className='fw-bold me-5'>| YOUR STUDENTS</h4>
                        </div>
                        <div className='col text-end'>
                            <button onClick={viewStudents} className='btn me-2' style={{ backgroundColor: '#4D3189', color: 'white' }}>
                                Students
                            </button>
                            <button onClick={ViewRecord} className='btn ms-2' style={{ backgroundColor: '#4D3189', color: 'white' }}>
                                Record
                            </button>
                        </div>
                    </div><br />
                    <table className="table table-light table-striped table-sm border">
                        <thead>
                            <tr style={{ color: '#4D3189' }}>
                                <th scope="col">Serial #</th>
                                <th scope="col">Name</th>
                                <th scope="col">Student ID</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedStudents.map((x, ind) =>
                                    <tr key={ind}>
                                        <th scope="row" style={{ color: '#4D3189' }}>{++ind}</th>
                                        <td>{x.fname} {x.lname}</td>
                                        <td>{x.studentID}</td>
                                        <td><button onClick={() => DeleteStudent(x._id)} className='btn pt-0 pb-0 ps-1 pe-1'><img src='./images/delete.png' alt='delete' width={"20px"} height={"20px"} /></button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    else if (choice === 2) {
        return (
            <>
                <Navbar 
                tab = {3}
                navNo = {1}/>
                <div className='container text-center mt-5'>
                    <div className='row'>
                        <div className='col col-6 text-start'>
                            <h4 className='fw-bold me-5'>| RECORD</h4>
                        </div>
                        <div className='col text-end'>
                            <button onClick={viewStudents} className='btn me-2' style={{ backgroundColor: '#4D3189', color: 'white' }}>
                                Students
                            </button>
                            <button onClick={ViewRecord} className='btn ms-2' style={{ backgroundColor: '#4D3189', color: 'white' }}>
                                Record
                            </button>
                        </div>

                    </div><br />
                    <div className='mb-4'>
                        <button onClick={ActivityNavDec} className='btn btn-sm btn-outline fw-bolder me-2' style={{ color: '#4D3189', borderColor: '#4D3189' }}>
                            «
                        </button>
                        <span className='fw-bold'>EXAM TYPE</span>
                        <button onClick={ActivityNavInc} className='btn btn-sm btn-outline fw-bolder ms-2' style={{ color: '#4D3189', borderColor: '#4D3189' }}>
                            »
                        </button>
                    </div>
                    <table className="table table-light table-striped table-sm border text-center">
                        <thead>
                            <tr style={{ color: '#4D3189' }}>
                                <th scope="col">Serial #</th>
                                <th scope="col">Student ID</th>
                                <th scope="col">Student Name</th>
                                {
                                    <th scope="col" style={{ color: 'black', fontWeight: 'normal' }}>(TW: <span style={{ color: '#4D3189' }}>{examTypeArray.weightage}</span>) <b>{examTypeArray.examType} {examTypeArray.activityNumber}</b> (TM: <span style={{ color: '#4D3189' }}>{examTypeArray.points}</span>)</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                examTypeArray.selectedStudents.map((x, ind) =>
                                    <tr key={ind}>
                                        <th scope="row" style={{ color: '#4D3189' }}>{++ind}</th>
                                        <td>{x.studentID}</td>
                                        <td>{x.fname} {x.lname}</td>
                                        <td>{x.marks}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    if (!requiredMarks.length) {
        return (
            <>
                <Navbar 
                tab = {3}
                navNo = {1}/>
                <div className='container text-center'>
                    <h5 style={{ color: 'red', marginTop: '2.5in' }}>No record found!</h5>
                </div>
            </>
        )
    }
}

export default ViewStudents