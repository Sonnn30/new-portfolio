import React from 'react'

export default function connect() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen gap-17 mb-10'>
        <h1 className='text-[#1E89FB] font-semibold text-[40px]'>Let’s Connect</h1>
      <div className='flex flex-col items-center py-12 w-[78%] h-full border-2 border-[#1E89FB] rounded-2xl bg-gradient-to-b from-[#B9E0FF] to-[#81CFFF] shadow-md shadow-[#1E89FB] gap-7'>
        <div className='flex items-center w-[85%] h-[10%] border-2 border-[#1E89FB] rounded-xl bg-white'>
          <input type="text" placeholder='Subject...' className='placeholder:text-[25px] placeholder:opacity-100 placeholder:text-black w-full h-full px-5 outline-none text-[25px]'/>
        </div>
        <div className='flex items-center w-[85%] h-[70%] border-2 border-[#1E89FB] rounded-xl bg-white'>
          <textarea name="desc" id="desc" placeholder='Desc...' className='placeholder:text-[25px] placeholder:opacity-100 placeholder:text-black w-full h-full p-5 outline-none text-[25px]'></textarea>
        </div>
        <button className='flex items-center justify-center w-[85%] h-[11%] border-2 border-[#1E89FB] rounded-[100px] bg-white text-[32px] px-5 text-[#1E89FB] font-bold hover:cursor-pointer'>
          Send
        </button>
      </div>
    </div>
  )
}
