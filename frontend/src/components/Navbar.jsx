import React, { useState, useEffect } from 'react'
import { assets } from "../assets/assets.js";
import { useAppContext } from '../context/AppContext.jsx';

const Navbar = () => {
  const { navigate, token } = useAppContext()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
      ${scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-primary/10 transition-transform py-3' 
        : 'bg-transparent py-5'
      }
    `}>
      <div className='flex justify-between items-center mx-8 sm:mx-20 xl:mx-32'>
        {/* Logo with hover effect */}
        <div onClick={() => navigate('/')} className='group cursor-pointer transition-all duration-300 hover:scale-105'>
          <img src={assets.logo} alt="SnapBlog Logo" className='w-32 sm:w-44 transition-all duration-300 filter group-hover:brightness-110' />
        </div>  

        {/* Classic Button with Refined Styling */}
        <button onClick={() => navigate('/admin')}
          className={`flex items-center gap-3 transition-all duration-500 ease-in-out group relative overflow-hidden
            ${scrolled 
              ? 'bg-primary text-white shadow-md hover:shadow-lg' 
              : 'bg-primary/80 text-gray-800 backdrop-blur-sm shadow-sm hover:bg-primary/60'
            }
            border border-primary/20 rounded-full px-6 py-2 font-medium text-sm hover:gap-4 hover:scale-105 active:scale-95 cursor-pointer
          `}
        >
          {/* Button Background Shine Effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <span className="relative z-10">
            {token ? 'Dashboard' : 'Admin Login'}
          </span>
          
          {/* Animated Arrow */}
          <img src={assets.arrow} alt="" className={`w-3 transition-all duration-300 relative z-10
              ${scrolled ? 'filter brightness-0 invert' : ''}
              group-hover:translate-x-1
            `} 
          />
        </button>  
      </div>
    </nav>
  )
}

export default Navbar