import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const LikedSongsPage = () => {
    const {user} = useContext(AuthContext)
  return (
    <div className='h-full '>
      <div className='rounded h-[40%] bg-teal-400  flex flex-col justify-end p-5 '>
        <h1 className='text-8xl font-extrabold'>Liked</h1>
        <p className='text-xl font-extralight text-teal-50'>By {user.name}</p>
      </div>
    </div>
  )
}

export default LikedSongsPage
