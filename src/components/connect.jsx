import React, { useEffect, useState } from 'react'
import useInView from './useInView'
import { Resend } from 'resend'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function connect() {
  const [titleRef, titleVisible, titleAnimate] = useInView()
  const [subjectRef, subjectVisible, subjectAnimate] = useInView()
  const [descRef, descVisible, descAnimate] = useInView()
  const [sendRef, sendVisible, sendAnimate] = useInView()
  const [subjectEmail, setSubjectEmail] = useState("")
  const [bodyEmail, setBodyEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!subjectEmail.trim() || !bodyEmail.trim()) {
      toast.error("Subject and message must be filled out")
      return
    }

    setLoading(true)
    try {
      await axios.post("https://new-portfolio-be-production.up.railway.app/send-email", {
        to: ["wilsonprajnawira345@gmail.com"],
        subject: subjectEmail,
        html: `<p>${bodyEmail.replace(/\n/g, "<br>")}</p>`,
      })
      toast.success("Email sent successfully!")
      setSubjectEmail("")
      setBodyEmail("")
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.detail || "Failed to send email")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen gap-17 mb-10'>
      <Toaster />
        <h1 ref={titleRef} className={`text-[#1E89FB] font-semibold text-[40px] ${titleVisible? `opacity-100 translate-y-0 ${titleAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 translate-y-20'}`}>Let’s Connect</h1>
      <div className='flex flex-col items-center py-12 w-[78%] h-full border-2 border-[#1E89FB] rounded-2xl bg-gradient-to-b from-[#B9E0FF] to-[#81CFFF] shadow-md shadow-[#1E89FB] gap-7'>
        <div ref={subjectRef} className={`flex items-center w-[85%] h-[10%] border-2 border-[#1E89FB] rounded-xl bg-white ${subjectVisible? `opacity-100 translate-y-0 ${subjectAnimate ? 'transition-all duration-900 ease-out' : ''}`: 'opacity-0 translate-y-20'}`}>
          <input value={subjectEmail} onChange={(e)=> setSubjectEmail(e.target.value)} type="text" placeholder='Subject...' className='placeholder:text-[25px] placeholder:opacity-100 placeholder:text-black w-full h-full px-5 outline-none text-[25px]'/>
        </div>
        <div ref={descRef} className={`flex items-center w-[85%] h-[70%] border-2 border-[#1E89FB] rounded-xl bg-white ${descVisible? `opacity-100 translate-y-0 ${descAnimate ? 'transition-all duration-1000 ease-out' : ''}`: 'opacity-0 translate-y-20'}`}>
          <textarea value={bodyEmail} onChange={(e) => setBodyEmail(e.target.value)} name="desc" id="desc" placeholder='Desc...' className='placeholder:text-[25px] placeholder:opacity-100 placeholder:text-black w-full h-full p-5 outline-none text-[25px]'></textarea>
        </div>
        <button ref={sendRef} onClick={handleSend} disabled={loading} className={`flex items-center justify-center w-[85%] h-[11%] border-2 border-[#1E89FB] rounded-[100px] bg-white text-[32px] px-5 text-[#1E89FB] font-bold hover:cursor-pointer disabled:opacity-60 ${sendVisible? `opacity-1100 translate-y-0 ${sendAnimate ? 'transition-all duration-800 ease-out' : ''}`: 'opacity-0 translate-y-20'}`}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  )
}
