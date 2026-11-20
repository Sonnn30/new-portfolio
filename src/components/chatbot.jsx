import axios from 'axios'
import { easeInOut, motion, AnimatePresence } from 'motion/react'
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

// Menghitung posisi sebuah elemen di dalam bingkai (untuk animasi masuk ke kotak)
function getClip(el, shell) {
    const s = shell.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    return `inset(${r.top - s.top}px ${s.right - r.right}px ${s.bottom - r.bottom}px ${r.left - s.left}px round 24px)`
}

// Membaca **tebal** di dalam satu teks
function parseInline(text) {
    const parts = text.split(/(\*\*[\s\S]*?(?:\*\*|$))/g)

    return parts.map((part, i) =>
        part.startsWith('**')
            ? <strong key={i}>{part.slice(2).replace(/\*\*$/, '')}</strong>
            : part
    )
}

// Isi satu sel tabel (mengubah <br> jadi baris baru)
function renderCell(text) {
    return text.split(/<br\s*\/?>/i).map((line, i) => (
        <span key={i}>
            {i > 0 && <br />}
            {parseInline(line.trim())}
        </span>
    ))
}

// Baris tabel selalu diawali tanda |
const isTableLine = (line) => line.trim().startsWith('|')

// Baris pemisah seperti |-------|-------|
const isSeparator = (line) => /^[\s|:-]+$/.test(line) && line.includes('-')

// Memecah "| a | b |" menjadi ["a", "b"]
const splitCells = (line) =>
    line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())

function Table({ lines }) {
    const hasHeader = lines.length > 1 && isSeparator(lines[1])
    const header = hasHeader ? splitCells(lines[0]) : null
    const rows = lines
        .slice(hasHeader ? 2 : 0)
        .filter((l) => !isSeparator(l))
        .map(splitCells)

    return (
        <div className='overflow-x-auto my-2'>
            <table className='border-collapse text-[12px]'>
                {header && (
                    <thead>
                        <tr>
                            {header.map((cell, i) => (
                                <th key={i} className='border border-blue-200 bg-blue-50 px-2 py-1 text-left'>
                                    {renderCell(cell)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {rows.map((row, r) => (
                        <tr key={r}>
                            {row.map((cell, i) => (
                                <td key={i} className='border border-blue-200 px-2 py-1 align-top'>
                                    {renderCell(cell)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function parseMarkdown(text) {
    const lines = text.split('\n')
    const blocks = []
    let i = 0

    while (i < lines.length) {
        const group = []
        const tableMode = isTableLine(lines[i])

        // kumpulkan baris berurutan yang jenisnya sama (tabel atau teks biasa)
        while (i < lines.length && isTableLine(lines[i]) === tableMode) {
            group.push(lines[i])
            i++
        }

        if (tableMode) {
            blocks.push(<Table key={blocks.length} lines={group} />)
        } else {
            blocks.push(
                <span key={blocks.length} className='whitespace-pre-wrap'>
                    {parseInline(group.join('\n').trim())}
                </span>
            )
        }
    }

    return blocks
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


export default function Chatbot() {
    const [ishide, setIsHide] = useState(true)
    const [change_page, setChange_page] = useState(false)
    const [data_msg, Setdata_msg] = useState([])
    const [inputText, setInputText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [startClip, setStartClip] = useState(null)   // posisi awal animasi masuk ke kotak
    const [showWelcome, setShowWelcome] = useState(true)   // page welcome: sekali tiap halaman dibuka
    const [showBye, setShowBye] = useState(false)         // page bye: tampil sebentar setelah close

    const shellRef = useRef(null)      // bingkai biru
    const inputBarRef = useRef(null)   // kotak input di halaman awal
    const chatRef = useRef(null)       // area daftar pesan

    const messages = [
        "Who is Wilson?",
        "What are Wilson's projects?",
        "What are Wilson's certificates?",
        "What tech stack does Wilson use?",
        "What is Wilson's educational background?",
        "What roles is Wilson open to professionally?",
        "What Wilson interest?",
    ]

    const submitMessage = () => {
        const text = inputText.trim()
        if (!text || isLoading) return
        if (!change_page && inputBarRef.current) {
            setStartClip(getClip(inputBarRef.current, shellRef.current))
        }
        setChange_page(true)
        handleSend(text)
        setInputText('')
    }

    const closeChat = () => {
        Setdata_msg((prev) => prev.map((m) => ({ ...m, isNew: false })))
        setStartClip(null)
        setShowBye(true)                       // tampilkan page bye dulu
        setTimeout(() => {                     // 1,5 detik kemudian baru benar-benar tertutup
            setShowBye(false)
            setIsHide(true)
        }, 2400)
    }

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

    useEffect(() => {
        if (ishide || !showWelcome) return        // timer hanya jalan saat chat terbuka dan welcome tampil
        const id = setTimeout(() => setShowWelcome(false), 2500)
        return () => clearTimeout(id)
    }, [ishide, showWelcome])

    const handleSend = async (text) => {
        try {
            setIsLoading(true)
            Setdata_msg((prev) => [...prev, { role: "user", message: text }])
            const data = await sendMessage(text)
            Setdata_msg((prev) => [...prev, { role: "bot", message: data.answer, isNew: true }])
        } catch (err) {
            console.error(err.response?.data?.detail ?? "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='fixed right-0 bottom-0 p-7'>
            {ishide ? (
                <button className='flex justify-center items-center rounded-full bg-[#1E89FB] w-14 h-14 shadow-[#107bee] shadow-xl/30 hover:cursor-pointer hover:scale-110' onClick={() => setIsHide(false)}>
                    <img src="/chatbot-logo.svg" alt="chabot" className='w-8 h-8' />
                </button>
            ) : (
                <div ref={shellRef} className='relative flex flex-col gap-4 bg-linear-to-br from-[#0858ae] to-[#62adfd] w-115 h-145 rounded-xl shadow-2xl'>

                    {/* HALAMAN AWAL: tampil sampai animasi selesai */}
                    {(!change_page || startClip) && !showWelcome && (
                        <>
                            <div className='flex w-full justify-between py-2 px-4'>
                                <p className='text-white font-semibold text-[16px]'>AskPorto</p>
                                <div className='flex justify-center items-center bg-white w-5 h-5 rounded-full hover:cursor-pointer' onClick={closeChat}>
                                    <img src="/close-svgrepo-com.svg" alt="close" className='w-3 h-3' />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 px-4'>
                                <p className='text-white font-bold text-[20px]'>Hello! I'm AskPorto.</p>
                                <p className='text-blue-100 font-semibold text-[16px]'>How can I help you explore more about Wilson today?</p>
                            </div>

                            <div className='flex flex-wrap gap-2 px-4 mt-5'>
                                {messages.map((text, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.1 }}
                                        className='flex justify-center items-center px-3 py-2 bg-white rounded-3xl border border-[#1E89FB] hover:shadow shadow-blue-300 hover:cursor-pointer'
                                        onClick={(e) => {
                                            if (isLoading) return
                                            setStartClip(getClip(e.currentTarget, shellRef.current))
                                            setChange_page(true)
                                            handleSend(text)
                                        }}
                                    >
                                        <p className='text-[13px] text-blue-950 font-semibold'>{text}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div ref={inputBarRef} className='absolute flex justify-center items-center gap-2 bottom-0 bg-white w-full h-15 rounded-b-xl py-2 px-4'>
                                <div className='flex items-center gap-4 border border-[#1E89FB] rounded-lg w-full h-10 shadow-xl/30 shadow-blue-300'>
                                    <textarea
                                        name="user"
                                        rows={1}
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder='Type your message...'
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitMessage() } }}
                                        className='w-full h-full px-3 py-2.5 leading-5 placeholder:text-[14px] resize-none outline-none overflow-hidden'
                                    ></textarea>
                                </div>
                                <div className='bg-[#1E89FB] w-9 h-9 shrink-0 rounded-full flex justify-center items-center hover:cursor-pointer' onClick={submitMessage}>
                                    <img src="/send-logo.svg" alt="send" className='w-5 h-5' />
                                </div>
                            </div>
                        </>
                    )}

                    {/* HALAMAN CHAT: melebar dari tempat klik */}
                    {change_page && (
                        <motion.div
                            className='absolute inset-0 flex flex-col bg-white'
                            initial={startClip ? { clipPath: startClip } : false}
                            animate={{ clipPath: 'inset(0px 0px 0px 0px round 12px)' }}
                            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                            onAnimationComplete={() => setStartClip(null)}
                        >
                            <div className='bg-linear-to-br from-[#0858ae] to-[#62adfd] flex w-full justify-between py-2 px-4 rounded-t-xl'>
                                <p className='text-white font-semibold text-[16px]'>AskPorto</p>
                                <div className='flex justify-center items-center bg-white w-5 h-5 rounded-full hover:cursor-pointer' onClick={closeChat}>
                                    <img src="/close-svgrepo-com.svg" alt="close" className='w-3 h-3' />
                                </div>
                            </div>

                            <div ref={chatRef} className='flex flex-col flex-1 min-h-0 overflow-y-auto gap-3 py-4 px-3'>

                                {/* 1. daftar pesan */}
                                {data_msg.map((chat, index) => (
                                    chat.role == 'user' ? (
                                        <div key={index} className='bg-linear-to-r from-[#4da2fd] to-[#0858ae] self-end max-w-[80%] px-3 rounded-t-xl rounded-l-xl rounded-br-sm'>
                                            <p className='text-white font-semibold px-0.5 py-2 text-[14px]'>{chat.message}</p>
                                        </div>
                                    ) : (
                                        <div key={index} className='bg-white border-2 border-blue-200 shadow-xl/20 shadow-blue-200 self-start max-w-[100%] min-w-0 px-3 rounded-t-xl rounded-r-xl rounded-bl-sm'>
                                            <div className='text-black font-semibold px-0.5 py-3 text-[14px]'>
                                                {chat.isNew
                                                    ? <TypingText text={chat.message} onType={scrollToBottom} />
                                                    : parseMarkdown(chat.message)}
                                            </div>
                                        </div>
                                    )
                                ))}

                                {/* 2. indikator loading, di luar map */}
                                {isLoading && (
                                    <div className='self-start bg-white border-2 border-blue-200 px-4 py-2 rounded-t-xl rounded-r-xl rounded-bl-sm'>
                                        <p className='text-[14px] font-semibold text-blue-950'>
                                            thinking
                                            {[0.2, 0.4, 0.6].map((start, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: [0, 0, 1, 1, 0] }}
                                                    transition={{
                                                        duration: 1.6,
                                                        times: [0, start, start + 0.05, 0.9, 1],
                                                        repeat: Infinity,
                                                        ease: 'linear',
                                                    }}
                                                >
                                                    .
                                                </motion.span>
                                            ))}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className='flex justify-center items-center gap-2 bg-white w-full h-15 rounded-b-xl py-2 px-4'>
                                <div className='flex items-center gap-4 border border-[#1E89FB] rounded-lg w-full h-10 shadow-xl/30 shadow-blue-300'>
                                    <textarea
                                        name="user"
                                        rows={1}
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder='Type your message...'
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitMessage() } }}
                                        className='w-full h-full px-3 py-2.5 leading-5 placeholder:text-[14px] resize-none outline-none overflow-hidden'
                                    ></textarea>
                                </div>
                                <div className='bg-[#1E89FB] w-9 h-9 shrink-0 rounded-full flex justify-center items-center hover:cursor-pointer' onClick={submitMessage}>
                                    <img src="/send-logo.svg" alt="send" className='w-5 h-5' />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {/* PAGE WELCOME: muncul saat pertama kali halaman dibuka */}
                    <AnimatePresence>
                        {showWelcome && (
                            <motion.div
                                key="welcome"
                                className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center rounded-xl bg-[#141E3C]'
                                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                                transition={{ duration: 1.2 }}
                            >
                                <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, ease: easeInOut }} src="/door-open.svg" alt="open" className='w-30 h-30 drop-shadow-[0_-5px_25px_#fde047] drop-shadow-yellow-300' />
                                <motion.p initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: easeInOut, delay:0.3 }} className='text-white font-bold text-3xl'>Hello & Welcome!</motion.p>
                                <motion.p initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: easeInOut, delay:0.3 }} className='text-white text-[16px]'>Nice to meet you! How can I help you today?</motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* PAGE BYE: muncul sebentar setelah close */}
                    {showBye && (
                        <motion.div
                            className='absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 p-6 text-center rounded-xl bg-[#141E3C]'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.img initial={{ scale: 0 }} animate={{ scale: 1 , rotate:[0, 15, -15, 0]}} transition={{ scale: {duration: 0.3, ease: easeInOut}, rotate: {duration:1, ease: easeInOut, delay:0.7} }} src="/bye.svg" alt="bye" className='w-30 h-30 drop-shadow-[0_-12px_35px_#fde047] drop-shadow-yellow-300 rounded-full' />
                            <motion.p initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: easeInOut }} className='text-white font-bold text-3xl'>Bye & See You!</motion.p>
                            <motion.p initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: easeInOut }} className='text-white text-[16px]'>See you again next time!</motion.p>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    )
}