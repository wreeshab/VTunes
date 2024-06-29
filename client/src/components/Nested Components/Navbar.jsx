import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center font-semibold '>
        <div className='flex items-center gap-2 '>
          <p className='lg:flex items-center justify-center w-20 hidden h-10 bg-black rounded-full text-white font-bold cursor-pointer'>Music </p>
           <p className='lg:flex items-center justify-center w-20 hidden h-10 bg-black rounded-full text-white font-bold cursor-pointer'>Artists </p>
            <p className='lg:flex items-center justify-center w-20 hidden h-10 bg-black rounded-full text-white font-bold cursor-pointer'>Users </p>
        </div>
        <div className='flex items-center gap-4'>
            <p className='w-10 h-10 bg-purple-500 rounded-full flex justify-center items-center text-black font-bold'>V</p>
        </div>
    </div>
  )
}

export default Navbar
