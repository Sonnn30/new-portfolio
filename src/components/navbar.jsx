import React, { useState } from 'react'

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState('home')

  return (
    <div className="flex justify-between py-4 px-25">
      
      <div>
        <h3 className="font-medium font-oswald text-[#1E89FB] text-[28px]">
          Wilson
        </h3>
      </div>

      <div className="flex gap-4">

        {/* HOME */}
        <div
          className={`flex gap-3 justify-center items-center px-5 py-1 rounded-xl hover:cursor-pointer ${
            activeMenu === 'home' ? 'bg-[#BDE1FD]' : ''
          }`}
          onClick={() => setActiveMenu('home')}
        >
          <img
            src={activeMenu === 'home' ? '/home.svg' : '/homeBlack.svg'}
            alt="home"
            width={20}
            height={20}
          />

          <p
            className={`font-semibold ${
              activeMenu === 'home' ? 'text-[#1E89FB]' : ''
            }`}
          >
            Home
          </p>
        </div>

        {/* PROFILE */}
        <div
          className={`flex gap-3 justify-center items-center px-5 py-1 rounded-xl hover:cursor-pointer ${
            activeMenu === 'profile' ? 'bg-[#BDE1FD]' : ''
          }`}
          onClick={() => setActiveMenu('profile')}
        >
          <img
            src={
              activeMenu === 'profile'
                ? '/profile.svg'
                : '/profileBlack.svg'
            }
            alt="profile"
            width={20}
            height={20}
          />

          <p
            className={`font-semibold ${
              activeMenu === 'profile' ? 'text-[#1E89FB]' : ''
            }`}
          >
            Profile
          </p>
        </div>

        {/* PORTFOLIO */}
        <div
          className={`flex gap-3 justify-center items-center px-5 py-1 rounded-xl hover:cursor-pointer ${
            activeMenu === 'portfolio' ? 'bg-[#BDE1FD]' : ''
          }`}
          onClick={() => setActiveMenu('portfolio')}
        >
          <img
            src={
              activeMenu === 'portfolio'
                ? '/Portofolio.svg'
                : '/PortofolioBlack.svg'
            }
            alt="portfolio"
            width={20}
            height={20}
          />

          <p
            className={`font-semibold ${
              activeMenu === 'portfolio' ? 'text-[#1E89FB]' : ''
            }`}
          >
            Portfolio
          </p>
        </div>

        {/* CONTACT */}
        <div
          className={`flex gap-3 justify-center items-center px-5 py-1 rounded-xl hover:cursor-pointer ${
            activeMenu === 'contact' ? 'bg-[#BDE1FD]' : ''
          }`}
          onClick={() => setActiveMenu('contact')}
        >
          <img
            src={
              activeMenu === 'contact'
                ? '/Contact.svg'
                : '/ContactBlack.svg'
            }
            alt="contact"
            width={20}
            height={20}
          />

          <p
            className={`font-semibold ${
              activeMenu === 'contact' ? 'text-[#1E89FB]' : ''
            }`}
          >
            Contact
          </p>
        </div>

      </div>
    </div>
  )
}