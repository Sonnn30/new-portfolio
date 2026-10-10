import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function project() {
    const [isClick, setClick] = useState('Project')
    const [projectList, setProjectList] = useState([])
    const [certificateList, setCertificateList] = useState([])
    const [techList, setTechList] = useState([])
    console.log(isClick)
    useEffect(() => {
        const controller = new AbortController()
        const base = "https://new-portfolio-be-production.up.railway.app"

        const config = { signal: controller.signal }

        if (isClick === 'Project') {
            axios.get(`${base}/project-list`, config)
                .then((res) => {console.log(res.data) , setProjectList(res.data)})
                .catch((err) => { if (!axios.isCancel(err)) console.error(err) })
        } else if (isClick === 'Certificate') {
            axios.get(`${base}/certificate-list`, config)
                .then((res) => {console.log(res.data) , setCertificateList(res.data)})
                .catch((err) => { if (!axios.isCancel(err)) console.error(err) })
        } else if (isClick === 'Tech') {
            axios.get(`${base}/skill-list`, config)
                .then((res) => {console.log(res.data) , setTechList(res.data)})
                .catch((err) => { if (!axios.isCancel(err)) console.error(err) })
        }

        return () => controller.abort()
    }, [isClick])

    function check_level(x){
        if(x >= 90 ){
            return 'Expert'
        }else if(x>= 75 && x < 90){
            return 'Advanced'
        }else if(x < 75){
            return 'Intermediate'
        }
    }

  return (
    <div className='flex flex-col items-center justify-center gap-10 md:mb-40'>
      <h1 className='text-[#1E89FB] font-semibold text-[40px]'>Portfolio Showcase</h1>
      <div className='w-[85%] h-40 flex items-center justify-center gap-4 bg-white rounded-lg shadow-xl'>
        <div className={`flex flex-col items-center justify-center w-[32%] h-30 rounded-md hover:cursor-pointer ${
                            isClick === 'Project' ? 'bg-[#c9e3fe]' : 'bg-white hover:bg-[#e0ecff] duration-150'
                        }`} onClick={() => setClick('Project')}>
            { isClick === 'Project' 
            ?(
                <>
                    <img src="/lab-svgrepo-blue.svg" alt="lab" width={60} height={60}/>
                    <p className='text-[#1E89FB] font-semibold text-[26px]'>Projects</p>
                </>
            )
            :(
                <>
                    <img src="/lab-svgrepo-black.svg" alt="lab" width={60} height={60}/>
                    <p className='text-black font-semibold text-[26px]'>Projects</p>
                </>

            )}
        </div>
        <div className={`flex flex-col items-center justify-center w-[32%] h-30 rounded-md hover:cursor-pointer ${
                            isClick === 'Certificate' ? 'bg-[#c9e3fe]' : 'bg-white hover:bg-[#e0ecff] duration-150'
                        }`} onClick={() => setClick('Certificate')}>
            { isClick === 'Certificate' 
            ?(
                <>
                    <img src="/certificate-blue.svg" alt="lab" width={60} height={60}/>
                    <p className='text-[#1E89FB] font-semibold text-[26px]'>Certificate</p>
                </>
            )
            :(
                <>
                    <img src="/certificate-black.svg" alt="lab" width={60} height={60}/>
                    <p className='text-black font-semibold text-[26px]'>Certificate</p>
                </>

            )}
        </div>
        <div className={`flex flex-col items-center justify-center w-[32%] h-30 rounded-md hover:cursor-pointer ${
                            isClick === 'Tech' ? 'bg-[#c9e3fe]' : 'bg-white hover:bg-[#e0ecff] duration-150'
                        }`} onClick={() => setClick('Tech')}>
            { isClick === 'Tech' 
            ?(
                <>
                    <img src="/tech-stack-blue.svg" alt="lab" width={60} height={60}/>
                    <p className='text-[#1E89FB] font-semibold text-[26px]'>Tech Stack</p>
                </>
            )
            :(
                <>
                    <img src="/tech-stack-black.svg" alt="lab" width={60} height={60}/>
                    <p className='text-black font-semibold text-[26px]'>Tech Stack</p>
                </>

            )}
        </div>

      </div>
      {
        isClick === 'Project' || isClick === '' ?
        <div className='w-[85%] mx-auto'>  
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {projectList.map((project)=> (
                    <div key={project.id} className='flex flex-col gap-3 w-full h-135 bg-gradient-to-b from-[#B9E0FF] to-[#81CFFF] border-2 border-[#1E89FB] rounded-2xl shadow-lg shadow-[#1E89FB] p-8'>
                        <img src={project.img_url} alt={project.title} width={845} height={100} className='border-2 border-[#1E89FB] rounded-2xl'/>
                        <h5 className='font-bold text-[18px]'>{project.title}</h5>
                        <p className='text-[16px]'>{project.short_desc}</p>
                        <button className='flex justify-center items-center gap-2 border-2 border-[#1E89FB] bg-white w-[18%] h-[8%] rounded-lg hover:cursor-pointer'>
                            <p className='text-[#1E89FB] font-semibold '>View Detail</p>
                            <img src="/arrow-icon-right.svg" alt="" width={20} height={20}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
        : isClick === 'Certificate' ?

        <div className='w-[85%] mx-auto'>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-7'>
                {certificateList.map((certif)=> (
                    <div key={certif.id} className='flex flex-col items-center w-full h-98 bg-gradient-to-b from-[#CEE9FF] to-[#ACD4FF]  border-2 border-[#1E89FB] rounded-2xl gap-5 py-5'>
                        <div className='flex justify-center items-center w-[87%] h-40 p-2 bg-[#E0F2FE] border-2 border-[#1E89FB] rounded-2xl overflow-hidden'>
                            <img src={certif.img} alt={certif.title} width={200} height={200}/>
                        </div>
                        <div className='flex flex-col flex-1 w-full px-4 gap-1'>
                            <p className='text-[16px] font-semibold text-start leading-tight'>{certif.title}</p>
                            <p className='text-[14px] font-bold text-[#1E89FB]'>by {certif.by}</p>
                        </div>
                        <div className='w-[90%] h-[1px] bg-[#1E89FB]'></div>
                        <a href={certif.link} className='flex items-center justify-center gap-3 w-[40%] h-[13%] border-2 border-[#1E89FB] bg-[#E0F2FE] rounded-xl hover:cursor-pointer'>
                            <p className='font-semibold text-[20px]'>View</p>
                            <img src="/redirect-logo.svg" alt="redirect" width={20} height={20} className='mt-1'/>
                        </a>
                    </div>
                ))}
            </div>        
        </div>
        :
        <div className='w-[85%] mx-auto'>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-7'>
                {techList.map((tech) => (
                <div key={tech.id} className='flex flex-col items-center w-full h-95 bg-gradient-to-b from-[#CEE9FF] to-[#ACD4FF]  border-2 border-[#1E89FB] rounded-2xl gap-6 py-5'>
                    <div className='flex justify-center items-center w-[87%] h-28 p-4 bg-[#E0F2FE] border-2 border-[#1E89FB] rounded-xl overflow-hidden'>
                        <img src={tech.img} alt={tech.title} width={60} height={60}/>
                    </div>
                    <div className='flex flex-col flex-1 w-full px-4'>
                        <p className='text-[18px] font-semibold text-start leading-tight'>{tech.title}</p>
                        <p className='text-[16px] font-bold text-[#1E89FB]'>{tech.category}</p>
                    </div>
                    <div className='w-[87%] h-[12%] flex justify-between items-center px-4 border-2 border-[#1E89FB] bg-[#E0F2FE] rounded-lg'>
                        <p className='text-[#1E89FB] text-[18px] font-bold'>{check_level(tech.level)}</p>
                        <div className='flex justify-center items-center bg-white w-[18%] rounded-md'>
                            <p className='text-[#1E89FB] text-[16px] font-bold'>{tech.level}%</p>
                        </div>
                    </div>
                    <div className='w-[90%] h-[1px] bg-[#1E89FB]'></div>
                    <button className='flex items-center justify-center gap-3 w-[45%] h-[13%] border-2 border-[#1E89FB] bg-[#E0F2FE] rounded-xl hover:cursor-pointer'>
                        <p className='font-semibold text-[20px]'>View</p>
                        <img src="/eye-logo.svg" alt="redirect" width={20} height={20} className='mt-1'/>
                    </button>
                </div>
                ))}
            </div>        
        </div>

      }
    </div>
  )
}
