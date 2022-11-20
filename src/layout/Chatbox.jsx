import React from 'react'

export default function Chatbox() {
  return (
    <div className='bg-gray-100 w-[100%] h-[500px] bg-rose-400'>
      
      <div className='flex flex-row items-center p-[25px] justify-start bg-gray-300 w-[100%] h-[150px] gap-[5px]'>
        <div className='bg-gray-400 w-[100px] h-[100px]'></div>
        <span>DM Full Name/ CHannel Name</span>
        <span className='h-[40px] w-[40px] bg-gray-400 text-center ml-auto'>...</span>
      </div>

      <div className='flex flex-col w-[100%]'>
        <div className='w-[80%] h-[40px] bg-gray-200 mt-[20px] ml-[20px]'></div>
        <div className='w-[80%] h-[40px] bg-gray-200 mt-[20px] ml-[20px]'></div>
      </div>

      <div className='w-[80%] h-[70px] bg-gray-300 ml-[20px]'></div>
    </div>
  )
}
