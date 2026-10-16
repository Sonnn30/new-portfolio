import axios from 'axios'
import useInView from './useInView'
import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function Project() {
    const navigate = useNavigate()
    const [isClick, setClick] = useState('Project')
    const [isViewTech, setIsViewTech] = useState(false)
    const [selectedSkillId, setSelectedSkillId] = useState(null)
    const [width, setWidth] = useState(0)
    const [projectList, setProjectList] = useState([])
    const [certificateList, setCertificateList] = useState([])
    const [techList, setTechList] = useState([])
    const [skillList, setSkillList] = useState({})  
    const effects = ['translate-y-20', '-translate-x-20', 'translate-x-20', 'scale-75']
    const [visibleCards, setVisibleCards] = useState({})
    const [titleRef, titleVisible, titleAnimate] = useInView()
    const base = "https://new-portfolio-be-production.up.railway.app"
    const fixUrl = (url) => (url?.startsWith('http') ? url : `https://${url}`)
    const data = [
    { bulan: '1M', nilai: skillList.level - 50 },
    { bulan: '3M', nilai: skillList.level - 40 },
    { bulan: '6M', nilai: skillList.level - 20 },
    { bulan: '12M', nilai: skillList.level },
    ]
    // 1. Ambil list sesuai tab yang dipilih
    useEffect(() => {
        const controller = new AbortController()
        const config = { signal: controller.signal }
        const onError = (err) => { if (!axios.isCancel(err)) console.error(err) }

        if (isClick === 'Project') {
            axios.get(`${base}/project-list`, config)
                .then((res) => setProjectList(res.data))
                .catch(onError)
        } else if (isClick === 'Certificate') {
            axios.get(`${base}/certificate-list`, config)
                .then((res) => setCertificateList(res.data))
                .catch(onError)
        } else if (isClick === 'Tech') {
            axios.get(`${base}/skill-list`, config)
                .then((res) => setTechList(res.data))
                .catch(onError)
        }

        return () => controller.abort()
    }, [isClick])
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.dataset.id
                setVisibleCards((prev) => ({ ...prev, [id]: entry.isIntersecting }))
            })
        })
        document.querySelectorAll('[data-card]').forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [projectList, certificateList, techList, isClick])

    // 2. Ambil detail skill saat modal dibuka
    useEffect(() => {
        if (!isViewTech || !selectedSkillId) return

        const controller = new AbortController()
        axios.get(`${base}/skill/${selectedSkillId}`, { signal: controller.signal })
            .then((res) => setSkillList(res.data))
            .catch((err) => { if (!axios.isCancel(err)) console.error(err) })

        return () => controller.abort()
    }, [isViewTech, selectedSkillId])

    // 3. Animasi progress bar
    useEffect(() => {
        if (!isViewTech) {
            setWidth(0)
            return
        }
        const t = setTimeout(() => setWidth(skillList.level || 0), 100)
        return () => clearTimeout(t)
    }, [isViewTech, skillList.level])

    // 4. Kunci scroll saat modal terbuka
    useEffect(() => {
        document.body.style.overflow = isViewTech ? 'hidden' : ''
        document.documentElement.style.overflow = isViewTech ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
    }, [isViewTech])

    function closeModal() {
        setIsViewTech(false)
        setSkillList({})          // buang data lama supaya tidak tampil di modal berikutnya
        setSelectedSkillId(null)
    }

    function check_level(x){
        if(x >= 90 ){
            return 'Expert'
        }else if(x>= 75 && x < 90){
            return 'Advanced'
        }else if(x < 75){
            return 'Intermediate'
        }
    }

    function check_difficulty(x){
        if (x <= 1){
            return 'Gentle'
        }else if (x <= 2){
            return 'Accessible'
        }else if (x <= 3){
            return 'Moderate'
        }else if (x <= 4){
            return 'Steep'
        }else if (x <= 5){
            return 'Rigorous'
        }
    }

    function calculate_star(x) {
        const stars = []

        for (let i = 0; i < x; i++) {
            stars.push(<img key={`full-${i}`} src='/star-y.svg' alt='star' className='w-5 h-5 mr-1' />)
        }
        for (let i = 0; i < 5 - x; i++) {
            stars.push(<img key={`empty-${i}`} src='/star.svg' alt='star' className='w-6 h-6' />)
        }

        return stars
    }
    useEffect(() => {
        document.body.style.overflow = isViewTech ? 'hidden' : ''
        document.documentElement.style.overflow = isViewTech ? 'hidden' : ''

        return () => {
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
        }
    }, [isViewTech])

  return (
    <div className='relative flex flex-col items-center justify-center gap-10 md:mb-40'>
      <h1 ref={titleRef} className={`text-[#1E89FB] font-semibold text-[40px] ${titleVisible? `opacity-100 translate-y-0 ${titleAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 translate-y-20'}`}>Portfolio Showcase</h1>
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
                {projectList.map((project, index)=> (
                    <div key={project.id} data-card data-id={`project-${project.id}`} className={`flex flex-col gap-3 w-full h-135 bg-gradient-to-b from-[#B9E0FF] to-[#81CFFF] border-2 border-[#1E89FB] rounded-2xl shadow-lg shadow-[#1E89FB] p-8 ${
                            visibleCards[`project-${project.id}`]  
                                ? 'opacity-100 translate-x-0 translate-y-0 scale-100 transition-all duration-700'
                                : `opacity-0 ${effects[index % effects.length]}`
                        }`}>
                        <img src={project.img_url} alt={project.title} width={845} height={100} className='border-2 border-[#1E89FB] rounded-2xl'/>
                        <h5 className='font-bold text-[18px]'>{project.title}</h5>
                        <p className='text-[16px]'>{project.short_desc}</p>
                        <button className='flex justify-center items-center gap-2 border-2 border-[#1E89FB] bg-white w-[18%] h-[8%] rounded-lg hover:cursor-pointer hover:shadow shadow-[#B9E0FF] hover:scale-105 duration-200' onClick={() => {localStorage.setItem('selectedId', project.id) 
                            navigate('/project-detail')}}>
                            <p className='text-[#1E89FB] font-semibold]'>View Detail</p>
                            <img src="/arrow-icon-right.svg" alt="" width={20} height={20}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
        : isClick === 'Certificate' ?

        <div className='w-[85%] mx-auto'>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-7'>
                {certificateList.map((certif, index)=> (
                    <div key={certif.id} data-card data-id={`certif-${certif.id}`} className={`flex flex-col items-center w-full h-98 bg-gradient-to-b from-[#CEE9FF] to-[#ACD4FF]  border-2 border-[#1E89FB] rounded-2xl gap-5 py-5 ${
                            visibleCards[`certif-${certif.id}`]
                                ? 'opacity-100 translate-x-0 translate-y-0 scale-100 transition-all duration-700'
                                : `opacity-0 ${effects[index % effects.length]}`
                        }`}>
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
                {techList.map((tech, index) => (
                <div key={tech.id} data-card data-id={`tech-${tech.id}`} className={`flex flex-col items-center w-full h-95 bg-gradient-to-b from-[#CEE9FF] to-[#ACD4FF]  border-2 border-[#1E89FB] rounded-2xl gap-6 py-5 ${
                            visibleCards[`tech-${tech.id}`]  
                                ? 'opacity-100 translate-x-0 translate-y-0 scale-100 transition-all duration-700'
                                : `opacity-0 ${effects[index % effects.length]}`
                        }`}>
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
                    <button className='flex items-center justify-center gap-3 w-[45%] h-[13%] border-2 border-[#1E89FB] bg-[#E0F2FE] rounded-xl hover:cursor-pointer'     onClick={() => {
                            setSelectedSkillId(tech.id)
                            setIsViewTech(true)}}>
                        <p className='font-semibold text-[20px]'>View</p>
                        <img src="/eye-logo.svg" alt="redirect" width={20} height={20} className='mt-1'/>
                    </button>
                </div>
                ))}
            </div>        
        </div>

      }
      {isViewTech && (
        <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-white/30 backdrop-blur-md overflow-hidden'>
            <div className='relative flex flex-col gap-2 w-[58%] max-h-[90vh] overflow-y-auto pb-5 bg-white rounded-3xl overflow-x-hidden'> 
                <div className='absolute flex items-center justify-center top-3 right-3 w-8 h-8 bg-white rounded-full hover:cursor-pointer' onClick={closeModal}>
                    <img src="/close-svgrepo-com.svg" alt="close" className='w-5 h-5'/>
                </div>
                <div className='flex flex-col gap-5 bg-[#1E89FB] px-6 pt-7 pb-5 rounded-t-3xl'>
                    <div className='flex items-center gap-4'>
                        <div className='flex justify-center items-center w-15 h-15 bg-[#CEE9FF] rounded-2xl'>
                            <img src={skillList.img} alt={skillList.title} className='w-10 h-10'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-white font-semibold text-[22px]'>{skillList.title}</p>
                            <div className='flex items-center gap-2'>
                                <img src="/category.svg" alt="category" className='w-4 h-4'/>
                                <p className='text-white text-[15px]'>{skillList.category}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex justify-between text-white text-[15px] font-semibold'>
                            <p>Profiency: {check_level(skillList.level)}</p>
                            <p className='font-bold'>{skillList.level}%</p>
                        </div>
                        <div className='w-full h-4 bg-[#7CC4FF] rounded-full overflow-hidden'>
                            <div
                                className='h-full w-[var(--value)] bg-white rounded-full transition-all duration-1000 ease-out'
                                style={{ '--value': `${width}%` }}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex gap-5 px-6 pt-4 '>
                    <div className='flex flex-col gap-5 w-[50%]'>
                        <div className='flex flex-col gap-5'>
                            <div className='flex items-center gap-1 '>
                                <img src="/about.svg" alt="about" className='w-6 h-6'/>
                                <p className='font-semibold text-[17px]'>About {skillList.title}</p>
                            </div>
                            <div className='border border-gray-200 rounded-md p-2 bg-gray-100'>
                                <p className='text-[14px]'>{skillList.desc}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 text-[12px]'>
                            <div className='flex items-center gap-1 '>
                                <img src="/list.svg" alt="list" className='w-6 h-6'/>
                                <p className='font-semibold text-[17px]'>Common Use Cases</p>
                            </div>
                            <div className='flex flex-wrap gap-3'>
                                {skillList.use_case?.map((e) =>(
                                    <div className='flex justify-center items-center border border-[#671078] rounded-md p-2 bg-[#e9b3f8] text-[#671078]'>
                                        <p key={e} className='font-semibold'>{e}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 bg-[#def0ff] border border-[#1E89FB] rounded-xl px-3 py-4'>
                            <div className='flex gap-1'>
                                <img src="/web.svg" alt="web" className='w-6 h-6'/>
                                <p className='font-semibold text-[17px]'>Official Recources</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-2 font-semibold'>
                                    <img src="/redirect-logo-b.svg" alt="redirect" className='w-5 h-5'/>
                                    <a href={fixUrl(skillList.link)} target='_blank' rel='noopener noreferrer' className='text-[#1E89FB]'>{skillList.link}</a>
                                </div>
                                <p>Visit for documentation and tutorials.</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex flex-col w-[50%] gap-3'>
                        <div className='flex flex-col w-full h-72 bg-[#eefdf4] py-4 gap-3 rounded-xl shadow'>
                            <div className='flex items-center gap-3 px-9 '>
                                <img src="/chart.svg" alt="chart" className='w-5 h-5'/>
                                <p className='font-semibold text-[17px]'>Learning Progress (In Month)</p>
                            </div>
                            <ResponsiveContainer width='100%' height='100%'>
                                <LineChart data={data}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='bulan' />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type='monotone'
                                    dataKey='nilai'
                                    stroke='#1E89FB'
                                    strokeWidth={3}
                                />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='flex flex-col gap-3 border border-gray-300 bg-gradient-to-b px-5 py-4 from-[#fefefd] to-[#f7d7b2] rounded-xl'>
                            <div className='flex gap-2 items-center'>
                                <img src="/book.svg" alt="book" className='w-6 h-6'/>
                                <p className='font-semibold text-[17px]'>Learning Difficulty</p>
                            </div>
                            <div className='flex justify-center items-center w-25 h-8 border border-amber-700 bg-amber-200 text-amber-700 rounded-2xl'>
                                <p className='font-semibold'>{check_difficulty(skillList.learning_difficulity)}</p>
                            </div>
                            <div className='flex items-center gap-0'>
                                {calculate_star(skillList.learning_difficulity)}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}
