import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DisplayHome from './Nested Components/DisplayHome'


const MainDisplay = () => {
  return (
    <div className='w-[100%] px-6 pt-4 rounded bg-lime-100 text-black overflow-auto lg:w-[75%] ' >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/about' element={"about"} />
        <Route path='/contact' element={"hello"} />
      </Routes>
    </div>
  )
}

export default MainDisplay
