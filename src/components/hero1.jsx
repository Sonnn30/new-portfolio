import React, { useState } from 'react'
import useTyping from './useTyping';
import { useRef } from 'react';
import { useAsyncError } from 'react-router';

export default function hero1() {
  const [ishide, setHide] = useState(false)
  const [isterminal, setTerminal] = useState(false)
  const boxRef = useRef(null)
  const termRef = useRef(null)                  
  useTyping(boxRef, 20, true, () => setTerminal(true)) 
  useTyping(termRef, 20, ishide)
  return (
    <div className='flex justify-between px-55 py-40 -mt-30 mb-25 h-full'>
      <div className='flex flex-col gap-5 w-[50%]'>
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
            <img src="/Contact.svg" alt="mail" width={24} height={24}/>
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
      <div ref={boxRef} className='relative flex flex-col gap-3 font-mono bg-black rounded-3xl w-[47%] border px-7 py-8 z-0'>
        <div className='flex justify-between px-3'>
          <div className='flex gap-2'>
            <div className='bg-[#ff5f57] rounded-full w-4.5 h-4.5'></div>
            <div className='bg-[#febc2e] rounded-full w-4.5 h-4.5'></div>
            <div className='bg-[#28c840] rounded-full w-4.5 h-4.5'></div>
          </div>
          <div className='group relative hover:cursor-pointer' onClick={() => isterminal && setHide(true)}>
            <img src="/play.svg" alt="play" width={30} height={30}/>
            <div className='hidden group-hover:block absolute top-11 left-1/2 bg-gray-900 border border-white w-12 text-center -translate-x-1/2 -translate-y-1/2'>
              <p className='text-white font-mono'>run</p>
            </div>
          </div>
        </div>
        <p className='text-[#666c74] text-lg'># about_wilson.py</p>
        <div className='flex flex-col gap-5'>
          <p className='text-[#ffcb6b]'><span className='text-[#c792ea]'>class</span> Wilson<span className='text-white'>:</span></p>
          <div className='flex flex-col gap-1 -mt-5'>
            <p className='text-white ml-8'>name <span className='ml-13'>= <span className='text-[#a5e075]'>"Wilson Prajnawira"</span></span></p>
            <p className='text-white ml-8'>from <span className='ml-13'>= <span className='text-[#a5e075]'>"Jakarta, Indonesia"</span></span></p>
            <p className='text-white ml-8'>University = <span className='text-[#a5e075]'>"Bina Nusantara University"</span></p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-white ml-8'>currently = {"{"}</p>
            <p className='text-white ml-17'><span className='text-[#a5e075]'>"studying"</span>: <span className='text-[#a5e075]'>"Fast-track Master's @ Binus"</span>,</p>
            <p className='text-white ml-17'><span className='text-[#a5e075]'>"learning"</span>: {"["}<span className='text-[#a5e075]'>"LangChain", "LangGraph", "LLM agents"</span>{"]"},</p>
            <p className='text-white ml-17'><span className='text-[#a5e075]'>"building"</span>: <span className='text-[#a5e075]'>"RAG chatbots & Website"</span>,</p>
            <p className='text-white ml-8'>{"}"}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-white ml-8'>mindset = <span className='text-[#a5e075]'>"Ship it, learn from it, make it better."</span></p>
            <p className='text-white ml-8'>status = <span className='text-[#a5e075]'>"Open to opportunities"</span></p>
          </div>
        </div>
        {
          ishide && (
            <div className='absolute w-full bg-black px-4 top-95 left-1/2 -translate-x-1/2 -translate-y-1/2 z-99'>
              <div ref={termRef} className='flex flex-col border-2 border-[#2f81f7] rounded-lg'>
                <div className='flex justify-between items-center text-[#8b949e] px-2'>
                  <div className='flex gap-4 items-center'>
                    <img src="/terminal.svg" alt="terminal" width={30} height={30}/>
                    <p>TERMINAL</p>
                    <p>·</p>
                    <p>python</p>
                  </div>
                  <div className='bg-[#2f81f7] w-4 h-0.5 hover:cursor-pointer' onClick={()=> setHide(!ishide)}></div>
                </div>
                <div className='border-t-2 border-[#2f81f7] py-2 px-2'>
                  <p className='text-white'><span className='text-[#7ee787]'>{">>>"}</span> Wilson.mindset</p>
                  <p className='text-[#ff9e64]'>'Ship it, learn from it, make it better.'</p>
                  <p className='text-white'><span className='text-[#7ee787]'>{">>>"}</span> Wilson.status</p>
                  <p className='text-[#ff9e64]'>'Open to opportunities'</p>
                </div>
              </div>            
            </div>
          )
        }
      </div>
    </div>
  )
}
