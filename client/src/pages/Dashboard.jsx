import React from 'react'
import Sidebar from '../components/Sidebar'
import TrackBar from '../components/TrackBar'
import MainDisplay from '../components/MainDisplay'

const Dashboard = () => {
  return (
    <div className='h-screen w-screen bg-white'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <MainDisplay/>
      </div>
    <TrackBar/>

    </div>
  )
}

export default Dashboard
