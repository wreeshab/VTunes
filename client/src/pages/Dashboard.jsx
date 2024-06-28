import React from 'react'
import Sidebar from '../components/Sidebar'
import TrackBar from '../components/TrackBar'

const Dashboard = () => {
  return (
    <div className='h-screen w-screen bg-white'>
      <div className='h-[90%] flex'>

        <Sidebar />
      </div>
    <TrackBar/>
    </div>
  )
}

export default Dashboard
