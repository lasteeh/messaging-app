import React from 'react'

export default function Sidepanel() {
  return (
    <div className='bg-gray-200 w-[20vw] h-[100vh]'>
      <div className='bg-gray-400 w-[100%] h-[150px]'></div>
      
      <div className='flex items-center justify-center bg-gray-300 w-[100%] h-[80px]'>
        <input className='w-[250px] h-[35px]'></input>
      </div>

      <div className='justify-self-center w-[260px] h-[70px] bg-gray-300 mt-[10px]'></div>
    </div>
  )
}