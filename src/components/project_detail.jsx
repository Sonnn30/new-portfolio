import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function Project_detail() {
    const [projectDetail, setProjectDetail] = useState({})
    const id = localStorage.getItem('selectedId')
    const navigate = useNavigate()

    useEffect(()=> {
      if (!id) return
      axios.get(`https://new-portfolio-be-production.up.railway.app/project/${id}`)
          .then((res) =>setProjectDetail(res.data))
          .catch((err) => console.error(err))
    }, [id])
  return (
    <div className='w-full flex flex-col gap-12 px-45 py-15 h-full bg-white'>
      <div className='flex gap-5 items-center w-full h-15'>
        <button className='flex justify-center items-center gap-1 bg-white border border-[#1E89FB] w-25 h-11 rounded-lg shadow shadow-[#8ac2fe] hover:cursor-pointer' onClick={() => navigate(-1)}>
            <img src="/left-arrow.svg" alt="left" width={22} height={22}/>
            <p className='text-[#1E89FB] font-semibold text-xl'>Back</p>
        </button>
        <div>
            <p className='text-[18px]'>Project &gt; {projectDetail.title}</p>
        </div>
      </div>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-7'>
          <div>
            <h1 className='text-[#1E89FB] text-[35px] font-semibold w-180 leading-tight'>{projectDetail.title}</h1>
          </div>
          <div className='w-23 h-1.5 bg-[#1E89FB] rounded-xl'>
          </div>
          <div className='w-180'>
            <p className='text-[20px]'>{projectDetail.desc}</p>
          </div>
          <div className='flex gap-2 shadow-md shadow-[#6cb3ff] h-25 px-5 py-4 bg-gradient-to-b from-[#d8f0fc] to-[#cde8ff] rounded-xl'>
            <div className='flex gap-5 w-[50%] border border-[#1E89FB] items-center bg-white px-5 rounded-xl'>
              <div className='flex justify-center items-center w-10 h-10 bg-[#BDE1FD] rounded-full'>
                <img src="/code-icon.svg" alt="code"  width={22} height={22}/>
              </div>
              <div className='flex flex-col '>
                <p className='text-[#1E89FB] font-semibold text-[20px]'>10</p>
                <p className='text-[14px]'>Tech Stack</p>
              </div>
            </div>
            <div className='flex gap-5 w-[50%] border border-[#1E89FB] items-center bg-white px-5 rounded-xl'>
              <div className='flex justify-center items-center w-10 h-10 bg-[#BDE1FD] rounded-full'>
                <img src="/key.svg" alt="key"  width={22} height={22}/>
              </div>
              <div className='flex flex-col '>
                <p className='text-[#1E89FB] font-semibold text-[20px]'>6</p>
                <p className='text-[14px]'>Key Features</p>
              </div>
            </div>
          </div>
          <div className='flex gap-3'>
            <a href={projectDetail.github} className='flex justify-center items-center gap-3 bg-[#1E89FB] text-white w-35 h-15 rounded-xl hover:cursor-pointer'>
              <img src="/github.svg" alt="github" width={20} height={20}/>
              <p className='font-semibold'>Github</p>
            </a>
            <a href={projectDetail.github} className='flex justify-center items-center gap-3 shadow-md bg-white border border-[#1E89FB] text-[#1E89FB] w-35 h-15 rounded-xl hover:cursor-pointer'>
              <img src="/share.svg" alt="share" width={20} height={20}/>
              <p className='font-semibold'>Share</p>
            </a>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex gap-2'>
              <img src="code-icon.svg" alt="code" width={25} height={25}/>
              <p className='text-[#1E89FB] font-semibold text-[20px]'>Technologies Used</p>
            </div>
            <div className='grid grid-cols-5 gap-4'>
              {projectDetail.tech_used?.map((p) => (
                <div key={p} className=' flex justify-center items-center bg-[#F0E1FF] border border-[#8B5CF6] text-[#8B5CF6] font-semibold text-[18px] px-1 py-1.5 rounded-lg'>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-10'>
          <div className='relative'>
            <img src="MOCKUP_3.png" alt="dummy" width={580} height={620} className='shadow shadow-[#1E89FB] rounded-xl'/>
            <div className='absolute top-2 right-2 bg-[#424242] w-12 h-7 rounded-2xl'>
              <p className='text-white text-center'>3/4</p>
            </div>
          </div>
          <div className='flex justify-center py-2 bg-[#FFEDDB] border border-[#EA7817] rounded-xl'>
            <p>test</p>
          </div>
          <div className='bg-[#C6EFD1] border border-[#16A34A]'>
            <p>Test</p>
          </div>
        </div>
      </div>
    </div>
  )
}
