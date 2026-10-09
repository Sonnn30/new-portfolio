import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import useInView from './useInView'

export default function hero2() {
    const [titleRef, titleVisible, titleAnimate] = useInView()
    const [subtitleRef, subtitleVisible, subtitleAnimate] = useInView()
    const [helloRef, helloVisible, helloAnimate] = useInView()
    const [hello2Ref, hello2Visible, hello2Animate] = useInView()
    const [descRef, descVisible, descAnimate] = useInView()
    const [buttonRef, buttonVisible, buttonAnimate] = useInView()
    const [imgRef, imgVisible, imgAnimate] = useInView()
    const [projectRef, projectVisible, projectAnimate] = useInView()
    const [certificateRef, certificateVisible, certificateAnimate] = useInView()
    const [experienceRef, experienceVisible, experienceAnimate] = useInView()
    const [eduRef, eduVisible, eduAnimate] = useInView()

    return (
        <div className='flex flex-col justify-center items-center gap-18 px-40'>
            <div className='flex flex-col items-center justify-center'>
            <h2 ref={titleRef} className={`text-[#1E89FB] font-semibold text-[40px] ${titleVisible? `opacity-100 translate-y-0 ${titleAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 translate-y-20'}`}>About Me</h2>
            <div ref={subtitleRef} className={`flex gap-2 ${subtitleVisible? `opacity-100 translate-y-0 ${subtitleAnimate ? 'transition-all duration-1100 ease-out' : ''}`: 'opacity-0 translate-y-20'}`}>
                <img src="/sparkles.svg" alt="sparkles" width={12} height={12}/>
                <p className='text-[18px]'>Bridging Full-Stack Development with Intelligent AI</p>
                <img src="/sparkles.svg" alt="sparkles" width={12} height={12}/>
            </div>
            </div>
            <div className='flex justify-between w-full'>
                <div className='flex flex-col gap-4'>
                    <p ref={helloRef} className={`text-[40px] font-semibold text-[#1E89FB] -mb-8 ${helloVisible? `opacity-100 translate-x-0 ${helloAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 -translate-x-40'}`}>
                        <TypeAnimation
                            sequence={[
                                "Hello world, I'm", 1000,
                                "Halo dunia, saya", 1000,
                                "你好，世界！我是", 1000,
                                "Hallo Welt, ich bin", 1000,
                                "こんにちは世界、私は", 1000,
                                "안녕하세요 세계, 저는", 1000,
                                "¡Hola mundo! Soy", 1000,
                                "汝好，世界！我是", 1000,
                                "Olá mundo, eu sou", 1000,
                                "Halo dunya, kula", 1000,
                                "Sampurasun dunya, wasta abdi", 1000,
                            ]}
                            repeat={Infinity}
                        />
                    </p>
                    <p ref={hello2Ref} className={`text-[36px] font-semibold ${hello2Visible? `opacity-100 translate-x-0 ${hello2Animate ? 'transition-all duration-900 ease-out' : ''}`: 'opacity-0 -translate-x-40'}`}>Wilson Prajnawira</p>
                    <p ref={descRef} className={`text-[16px] ml-0.5 -mt-2 ${descVisible? `opacity-100 translate-x-0 ${descAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 -translate-x-40'}`}>I am a full-stack developer with over one year of experience building full-stack websites. <br /> I am currently expanding my knowledge 
                        in AI by integrating large language models (LLM) <br /> into systems using LangChain. I am currently enrolled in a fast-track master’s 
                        program to <br /> advance my knowledge of AI.</p>
                    <div ref={buttonRef} className={`flex gap-4 justify-center items-center bg-[#1E89FB] w-40 py-2.5 rounded-xl hover:cursor-pointer ${buttonVisible? `opacity-100 translate-y-0 ${buttonAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 translate-y-20'}`}>
                        <p className='font-bold text-[15px] text-white'>View Project</p>
                        <img src="/arrow-icon.svg" alt="arrow" width={15} height={15}/>
                    </div>
                </div>
                <div>
                    <img ref={imgRef} src="/pp.png" alt="pp" width={258} height={258} className={`rounded-full shadow-[0_10px_20px_#60ADFF] transition-all duration-400 ease-in hover:scale-105 hover:rotate-1  ${imgVisible? `opacity-100 translate-y-0 ${imgAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 translate-y-40'}`}/>
                </div>
            </div>
            <div className='flex justify-between w-full'>
                <div className='flex gap-3 w-full'>
                    <div ref={projectRef} className={`flex flex-col gap-5 w-[41%] h-42 bg-gradient-to-b from-[#acd6fa] to-[#1e89fb55] rounded-xl px-4 ${projectVisible? `opacity-100 translate-y-0 translate-x-0 ${projectAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 -translate-y-10 -translate-x-20'}`}>
                        <div className='flex justify-between py-4'>
                            <div className='flex justify-center items-center px-3 h-13 bg-[#1E89FB] rounded-md'>
                                <img src="/lab-svgrepo.svg" alt="lab" width={32} height={32}/>
                            </div>
                            <p className='text-[46px] font-semibold -mt-3'>3</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-semibold text-[18px] text-[#1E89FB]'>Total Projects</p>
                            <div className='flex justify-between'>
                                <p className='text-[14px]'>Experiments, prototypes, and practical builds</p>
                                <img src="/forward.svg" alt="forward" width={20} height={20}/>
                            </div>
                        </div>
                    </div>
                    <div ref={certificateRef} className={`flex flex-col gap-5 w-[41%]  h-42 bg-gradient-to-b from-[#acd6fa] to-[#1e89fb55] rounded-xl px-4 ${certificateVisible? `opacity-100 translate-y-0 ${certificateAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 translate-y-20 '}`}>
                        <div className='flex justify-between py-4'>
                            <div className='flex justify-center items-center px-3 h-13 bg-[#1E89FB] rounded-md'>
                                <img src="/certificate.svg" alt="certificate" width={28} height={40}/>
                            </div>
                            <p className='text-[46px] font-semibold -mt-3'>11</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-semibold text-[18px] text-[#1E89FB]'>Certificates</p>
                            <div className='flex justify-between'>
                                <p className='text-[14px]'>Professional skills validated</p>
                                <img src="/forward.svg" alt="forward" width={20} height={20}/>
                            </div>
                        </div>
                    </div>
                    <div ref={experienceRef} className={`flex flex-col gap-5 w-[41%]  h-42 bg-gradient-to-b from-[#acd6fa] to-[#1e89fb55] rounded-xl px-4 ${experienceVisible? `opacity-100 translate-y-0 translate-x-0 ${experienceAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 -translate-y-10 translate-x-20'}`}>
                        <div className='flex justify-between py-4'>
                            <div className='flex justify-center items-center px-3 h-13 bg-[#1E89FB] rounded-md'>
                                <img src="/sand-clock.svg" alt="lab" width={30} height={30}/>
                            </div>
                            <p className='text-[46px] font-semibold -mt-3'>1</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-semibold text-[18px] text-[#1E89FB]'>Years of Experience</p>
                            <div className='flex justify-between'>
                                <p className='text-[14px]'>Continuous Learning journey </p>
                                <img src="/forward.svg" alt="forward" width={20} height={20}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={eduRef} className={`w-full flex flex-col ${eduVisible? `opacity-100 translate-y-0 ${eduAnimate ? 'transition-all duration-900 ease-out' : ''}`: 'opacity-0 translate-y-55'}`}>
                <div className='flex flex-col gap-1 border-2 border-[#1E89FB] px-8 py-4 h-90 rounded-2xl'>
                    <h3 className='text-[24px] text-center font-semibold w-full'>Education</h3>
                    <div className='flex gap-10 items-center w-full bg-white mt-4 px-4 py-3 shadow-md'>
                        <img src="/Logo-Binus.png" alt="binus" width={100} height={100}/>
                        <div className='flex flex-col'>
                            <h3 className='text-[18px] font-medium'>Universitas Bina Nusantara</h3>
                            <p className='text-[16px] font-light'>Bachelor of Computer Science, Intelligent System</p>
                            <p className='text-[16px] font-light'>Sep 2023 - Sep 2027</p> 
                            <p className='text-[16px] font-light'><span className='text-[#067B80] font-normal'>Grade: 3.51/4.00</span> (7th Semester)</p>
                        </div>
                    </div>
                    <div className='flex gap-10 items-center w-full bg-white mt-4 px-4 py-0.5 shadow-md'>
                        <img src="/Logo-Binus.png" alt="binus" width={100} height={100}/>
                        <div className='flex flex-col'>
                            <h3 className='text-[18px] font-medium'>Universitas Bina Nusantara</h3>
                            <p className='text-[16px] font-light'>Master of Computer Science</p>
                            <p className='text-[16px] font-light'><span className='text-[#067B80] font-normal'>Coming soon</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
    }
