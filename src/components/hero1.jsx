import React from 'react'

export default function hero1() {
  return (
    <div className='px-60 py-40 -mt-30 mb-25'>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-center items-center gap-2 px-3 py-1 bg-[#c8e5f9] border-1 border-[#35a2f6] w-75 rounded-2xl'>
          <img src="/sparkles.svg" alt="sparkles" width={15} height={15}/>
           <p className='text-[#1E89FB] font-semibold'>AI • Data • Software Engineering</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-[64px] font-extrabold'>AI <span className='bg-gradient-to-r from-[#2293E4] via-[#667EEA] to-[#6D28D9] bg-clip-text text-transparent'>Engineer.</span></h1>
          <h3 className='text-[24px] font-semibold'>Turning Data into Intelligent Solutions</h3>
          <p className='text-[16px]'>I craft smart systems powered by data and AI to solve real-world problems and <br />build a better tomorrow.</p>
        </div>
        <div className='flex gap-2'>
          <div className='flex justify-center items-center bg-[#FFFFFF] px-4 py-1 rounded-xl border-1 border-[#BDE1FD]'>
            <p className='text-[#1E89FB] text-[13px] font-medium'>Python</p>
          </div>
          <div className='flex justify-center items-center bg-[#FFFFFF] px-4 py-1 rounded-2xl border-1 border-[#BDE1FD]'>
            <p className='text-[#1E89FB] text-[13px] font-medium'>AI/ML</p>
          </div>
          <div className='flex justify-center items-center bg-[#FFFFFF] px-4 py-1 rounded-2xl border-1 border-[#BDE1FD]'>
            <p className='text-[#1E89FB] text-[13px] font-medium'>Deep Learning</p>
          </div>
          <div className='flex justify-center items-center bg-[#FFFFFF] px-4 py-1 rounded-2xl border-1 border-[#BDE1FD]'>
            <p className='text-[#1E89FB] text-[13px] font-medium'>SQL</p>
          </div>
          <div className='flex justify-center items-center bg-[#FFFFFF] px-4 py-1 rounded-2xl border-1 border-[#BDE1FD]'>
            <p className='text-[#1E89FB] text-[13px] font-medium'>Software Engineering</p>
          </div>
        </div>
        <div className='flex gap-5'>
          <button className='flex gap-3 bg-[#1E89FB] w-40 px-3 py-2.5 justify-center items-center rounded-3xl hover:cursor-pointer'>
            <p className='text-[15px] font-bold text-white'>Projects</p>
            <img src="/arrow-icon.svg" alt="arrow" width={20} height={20}/>
          </button>
          <button className='flex gap-3 bg-white border-2 border-[#1E89FB] w-40 px-3 py-2.5 justify-center items-center rounded-3xl hover:cursor-pointer'>
            <p className='text-[15px] font-bold text-[#1E89FB]'>Connect</p>
            <img src="/mail-icon.svg" alt="mail" width={20} height={20}/>
          </button>
        </div>
        <div className='flex gap-3'>
          <button className='bg-white px-3 py-3 rounded-full hover:cursor-pointer' onClick={() => window.open("https://github.com/Sonnn30", "_blank")}>
            <img src="/github-icon.svg" alt="github" width={22} height={22}/>
          </button>
          <button className='bg-white px-3 py-3 rounded-full hover:cursor-pointer' onClick={() => window.open("https://www.linkedin.com/in/wilson-prajnawira/", "_blank")}>
            <img src="/linkedin-icon.svg" alt="github" width={22} height={22}/>
          </button>
          <button className='bg-white px-3 py-3 rounded-full hover:cursor-pointer' onClick={() => {console.log("clicked email"); window.location.href="https://mail.google.com/mail/?view=cm&fs=1&to=wilsonprajnawira345@gmail.com&su=Hello";}}>
            <img src="/Contact.svg" alt="contact" width={22} height={22}/>
          </button>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}
