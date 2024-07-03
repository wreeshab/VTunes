import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import SearchPage from './SearchPage'


const MainDisplay = () => {
  return (
    <div className='w-[100%] px-6 pt-4 rounded bg-gradient-to-r bg-gray-100 text-teal-900   overflow-auto lg:w-[75%] ' >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/contact' element={"hello"} />
      </Routes>
    </div>
  )
}

export default MainDisplay
