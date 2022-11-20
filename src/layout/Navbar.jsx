import React from 'react'

export default function Navbar() {
  return (
    <div className='flex flex-col items-center bg-gray-300 w-[10vw] h-[100vh]'>
      <div className='h-[100px] w-[100px] bg-rose-400 mt-[20px]'>logo</div>
      <div className='h-[80px] w-[80px] bg-rose-300 mt-[20px]'>button</div>
      <div className='h-[80px] w-[80px] bg-rose-300 mt-[20px]'>button</div>
      <div className='h-[80px] w-[80px] bg-rose-300 mt-[20px]'>button</div>
    </div>
  )
}