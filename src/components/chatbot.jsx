
import React, { useState } from 'react'

export default function chatbot() {
    const [ishide, setIsHide] = useState(false)
    const messages = [
        "Who is Wilson?",
        "What are Wilson's projects?",
        "What are Wilson's certificates?",
        "What tech stack does Wilson use?",
        "What is Wilson's educational background?",
        "What roles is Wilson open to professionally?",
        "What are Wilson's interests?",
        "Please guide me about this website",
        "What is AskPorto?",
    ]
  return (
    <div className='fixed right-0 bottom-0 p-7'>
        {ishide ? (
            <>
                <button className='flex justify-center items-center rounded-full bg-[#1E89FB] w-14 h-14 shadow-[#107bee] shadow-xl/30 hover:cursor-pointer' onClick={() => setIsHide(!ishide)}>
                    <img src="/chatbot-logo.svg" alt="chabot" className='w-8 h-8'/>
                </button>
            
            </>
        ) : (
            <>
                <div className='relative flex flex-col gap-4 bg-linear-to-br from-[#1885fa] to-[#62adfd] w-115 h-145 rounded-xl shadow-2xl'>
                    <div className='flex w-full justify-between py-2 px-4'>
                        <p className='text-white font-semibold text-[16px]'>AskPorto</p>
                        <div className='flex justify-center items-center bg-white w-5 h-5 rounded-full hover:cursor-pointer' onClick={() => setIsHide(!ishide)}>
                            <img src="/close-svgrepo-com.svg" alt="close" className='w-3 h-3'/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 px-4'>
                        <p className='text-white font-bold text-[20px]'>Hello! I'm AskPorto.</p>
                        <p className='text-blue-100 font-semibold text-[16px]'>How can I help you explore more about Wilson today?</p>
                    </div>

                    <div className='grid grid-cols-2 px-4'>
                        <div className='flex justify-center items-center p-4 bg-white rounded-2xl border border-[#1E89FB] shadow shadow-blue-300'>
                            <p className='text-2xl font-semibold'></p>
                        </div>
                    </div>

                    <div className='absolute flex justify-center items-center gap-2 bottom-0 bg-white w-full h-15 rounded-b-xl py-2 px-4'>
                        <div className='flex items-center gap-4 border border-[#1E89FB] rounded-lg w-full h-10 shadow-xl/30 shadow-blue-300'>
                            <textarea name="user" id="user" rows={1} placeholder='Type your message...' className='w-full h-full px-3 py-2.5 leading-5 resize-none outline-none overflow-hidden'></textarea>
                        </div>
                        <div className='bg-[#1E89FB] w-9 h-9 shrink-0 rounded-full flex justify-center items-center hover:cursor-pointer'>
                            <img src="/send-logo.svg" alt="send" className='w-5 h-5'/>
                        </div>
                    </div>
                </div>
            
            </>
            
        ) 
    }


      
    </div>
  )
}
