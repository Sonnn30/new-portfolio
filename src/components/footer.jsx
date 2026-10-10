import React, { useEffect, useState } from 'react'

export default function footer() {
  const [waktu, setWaktu] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setWaktu(new Date()), 6000)
    return ()=> clearInterval(timer)
  },[])
  const jam = waktu.getHours()
  const isNight = jam >= 18 || jam < 5
  const isMorning = jam >=4 && jam < 12 
  const isAfternoon = jam >= 12 && jam < 15 
  const isEvening = jam >= 15 && jam < 18 
  return (
    <div className='w-full h-[115px] flex justify-center items-center gap-95 border-t-2 border-t-[#1E89FB] bg-[#D0EDFF]'>
      <div className='flex flex-col justify-center'>
        <div className='flex '>
            <p className='text-[#235386] text-[24px] font-bold'>WilsonP</p>
            <p className='text-[#1E89FB] font-bold text-[12px]'>TM</p>
        </div>
        <p className='text-[#1E89FB] text-[12px] font-medium'>@2026 All Rights Reserved</p>
      </div>
      <div className='flex flex-col items-center justify-center w-[17%] h-full gap-1'>
        {isNight ?
        <>
          <div className='flex items-center justify-center gap-2 bg-[#6C3FA0] w-[65%] h-[32%] rounded-3xl'>
              <img src="/moon.svg" alt="moon" width={25} height={25} />
              <p className='text-[14px] font-semibold text-white'>Good Night: {waktu.toLocaleTimeString('en-GB', {hour: '2-digit', minute: "2-digit"})}</p>
          </div>
        </>
        
        :
        <>
          <div className='flex items-center justify-center gap-2 bg-[#F9B027] w-[65%] h-[32%] rounded-3xl'>
              <img src="/matahari.svg" alt="matahari" width={25} height={25} />
              <p className='text-[14px] font-semibold text-white'>{isMorning ? "Good Morning " : isAfternoon ? "Good Afternoon " : isEvening ? "Good Evening " : ""}{waktu.toLocaleTimeString('en-GB', {hour: '2-digit', minute: "2-digit"})}</p>
          </div>
        </>
        }
        <p className='text-[12px] text-[#1E89FB] font-normal text-center italic'>“It’s the truth itself. It spreads like an epidemic. Not even the host can control it.” <span className='font-bold'>— Rafal</span></p>
      </div>
      <div className='w-[10%] h-full flex flex-col justify-center items-end gap-2'>
        <p className='text-[18px] font-semibold text-[#1E89FB] text-end'>Made With:</p>
        <div className='flex gap-3'>
            <img src="/js-logo.svg" alt="js" width={25} height={25}/>
            <img src="/fast-api-logo.svg" alt="js" width={25} height={25}/>
            <img src="/tailwind-logo.svg" alt="js" width={25} height={25}/>
            <img src="/react-logo.svg" alt="js" width={25} height={25}/>
        </div>
        <div className='flex gap-3'>
            <img src="/cloudflare-logo.svg" alt="js" width={25} height={25}/>
            <img src="/motion-logo.svg" alt="js" width={25} height={25}/>
            <img src="/langchain-logo.svg" alt="js" width={62} height={35}/>
        </div>
      </div>
    </div>
  )
}
