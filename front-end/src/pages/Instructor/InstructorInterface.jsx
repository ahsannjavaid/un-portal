import React from 'react'
import Navbar from '../../components/Navbar'
import Carousel from '../../components/Carousel'

const InstructorInterface = () => {
  const firstName = localStorage.getItem('firstName')
  return (
    <>
      <Navbar 
      tab = {1}
      navNo = {1} />
      <Carousel
      crsNo = {1}
      fname = {firstName} />
    </>
  )
}

export default InstructorInterface