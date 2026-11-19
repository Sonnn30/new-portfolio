import axios from 'axios'
import { motion } from 'motion/react'
import React, { useEffect, useState, useRef } from 'react'

const API_URL = "https://new-portfolio-be-production.up.railway.app"

function getSessionId() {
    let id = localStorage.getItem("chat_session_id")
    if (!id) {
        id = crypto.randomUUID()
        localStorage.setItem("chat_session_id", id)
    }
    return id
}

function parseMarkdown(text) {
    const parts = text.split(/(\*\*[\s\S]*?(?:\*\*|$))/g)

    return parts.map((part, i) => {
        if (part.startsWith('**')) {
            return <strong key={i}>{part.slice(2).replace(/\*\*$/, '')}</strong>
        }
        return part
    })
}

function TypingText({ text, speed = 15, step = 2, onType }) {
    const [shown, setShown] = useState(0)

    useEffect(() => {
        let i = 0
        setShown(0)
        const id = setInterval(() => {
            i = Math.min(i + step, text.length)
            setShown(i)
            onType?.()
            if (i >= text.length) clearInterval(id)
        }, speed)
        return () => clearInterval(id)
    }, [text])

    return <>{parseMarkdown(text.slice(0, shown))}</>
}




export default function chatbot() {
    const [ishide, setIsHide] = useState(true)
    const [selected_msg, setSelected_msg] = useState("")
    const [change_page, setChange_page] = useState(false)
    const [data_msg, Setdata_msg] = useState([])
    const [inputText, setInputText] = useState('')
    const messages = [
        "Who is Wilson?",
        "What are Wilson's projects?",
        "What are Wilson's certificates?",
        "What tech stack does Wilson use?",
        "What is Wilson's educational background?",
        "What roles is Wilson open to professionally?",
        "What are Wilson's interests?",
    ]
    const submitMessage = () => {
        const text = inputText.trim()
        if (!text) return          
        setChange_page(true)
        handleSend(text)
        setInputText('')        
    }

    const chatRef = useRef(null)

    const scrollToBottom = () => {
        const el = chatRef.current
        if (el) el.scrollTop = el.scrollHeight
    }

    useEffect(() => {
        scrollToBottom()
    }, [data_msg, change_page, ishide])


    async function sendMessage(text) {
        const res = await axios.post(`${API_URL}/input-chat`, {
            role: "user",
            message: text,
            session_id: getSessionId(),
        })
        return res.data
    }

    useEffect(() => {
        axios.get(`${API_URL}/get-chat/${getSessionId()}`)
            .then((res) => Setdata_msg(res.data))
            .catch((err) => console.error(err))
    }, [])

    const handleSend = async (text) => {
        try {
            Setdata_msg((prev) => [...prev, { role: "user", message: text }])
            const data = await sendMessage(text)
            Setdata_msg((prev) => [...prev, { role: "bot", message: data.answer, isNew: true }])
        } catch (err) {
            console.error(err.response?.data?.detail ?? "Something went wrong")
        }
    }

    console.log(data_msg)

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
                    {change_page ? (
                        <div>
                            <div className='relative flex flex-col bg-white w-115 h-145 rounded-xl shadow-2xl'>
                                <div className='bg-linear-to-br from-[#0858ae] to-[#62adfd] flex w-full justify-between py-2 px-4 rounded-t-xl'>
                                    <p className='text-white font-semibold text-[16px]'>AskPorto</p>
                                    <div className='flex justify-center items-center bg-white w-5 h-5 rounded-full hover:cursor-pointer' onClick={() => setIsHide(!ishide)}>
                                        <img src="/close-svgrepo-com.svg" alt="close" className='w-3 h-3'/>
                                    </div>
                                </div>


                                <div ref={chatRef} className='flex flex-col flex-1 min-h-0 overflow-y-auto gap-2 py-4 px-3'>
                                    {data_msg.map((chat, index) =>(
                                        chat.role == 'user' ? (
                                            <div key={index} className='bg-linear-to-r from-[#4da2fd] to-[#0858ae] self-end max-w-[80%] px-3 rounded-t-xl rounded-l-xl rounded-br-sm'>
                                                <p className='text-white font-semibold px-0.5 py-2 text-[14px]'>{chat.message}</p>
                                            </div>

                                        )    
                                        :
                                        (
                                            <div key={index} className='bg-white border-2 border-blue-200 shadow-xl/20 shadow-blue-200 self-start max-w-[80%] px-3 rounded-t-xl rounded-r-xl rounded-bl-sm'>
                                                <p className='text-black font-semibold px-0.5 py-3 text-[14px] whitespace-pre-wrap'>
                                                    {chat.isNew
                                                        ? <TypingText text={chat.message} onType={scrollToBottom} />
                                                        : parseMarkdown(chat.message)}
                                                </p>
                                            </div>
                                        )

                                    ))}

     
                                </div>

                                <div className='flex justify-center items-center gap-2 bottom-0 bg-white w-full h-15 rounded-b-xl py-2 px-4'>
                                    <div className='flex items-center gap-4 border border-[#1E89FB] rounded-lg w-full h-10 shadow-xl/30 shadow-blue-300'>
                                        <textarea name="user" id="user" rows={1} value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder='Type your message...' onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey) {e.preventDefault() ,submitMessage()}}} className='w-full h-full px-3 py-2.5 leading-5 placeholder:text-[14px] resize-none outline-none overflow-hidden'></textarea>
                                    </div>
                                    <div className='bg-[#1E89FB] w-9 h-9 shrink-0 rounded-full flex justify-center items-center hover:cursor-pointer' onClick={submitMessage}>
                                        <img src="/send-logo.svg" alt="send" className='w-5 h-5'/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className='relative flex flex-col gap-4 bg-linear-to-br from-[#0858ae] to-[#62adfd] w-115 h-145 rounded-xl shadow-2xl'>
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

                                <div className='flex flex-wrap gap-2 px-4 mt-5'>
                                    {messages.map((text, index) => (
                                        <motion.div key={index} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.2, delay: index * 0.1 }} className='flex justify-center items-center px-3 py-2 bg-white rounded-3xl border border-[#1E89FB] hover:shadow shadow-blue-300 hover:cursor-pointer' onClick={() => (setSelected_msg(text), setChange_page(true), handleSend(text))}>
                                                <p className='text-[13px] text-blue-950 font-semibold'>{text}</p>
                                        </motion.div>
                                        ))}
                                </div>

                                <div className='absolute flex justify-center items-center gap-2 bottom-0 bg-white w-full h-15 rounded-b-xl py-2 px-4'>
                                    <div className='flex items-center gap-4 border border-[#1E89FB] rounded-lg w-full h-10 shadow-xl/30 shadow-blue-300'>
                                        <textarea name="user" id="user" rows={1} value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder='Type your message...' onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey) {e.preventDefault() ,submitMessage()}}} className='w-full h-full px-3 py-2.5 leading-5 placeholder:text-[14px] resize-none outline-none overflow-hidden'></textarea>
                                    </div>
                                    <div className='bg-[#1E89FB] w-9 h-9 shrink-0 rounded-full flex justify-center items-center hover:cursor-pointer' onClick={() => submitMessage()}>
                                        <img src="/send-logo.svg" alt="send" className='w-5 h-5'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) }
            </>
            
        ) 
    }      
    </div>
  )
}
