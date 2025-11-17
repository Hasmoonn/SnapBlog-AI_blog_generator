import React, { useRef, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import {Sparkles} from 'lucide-react'

const Header = () => {
  const { setInput, input } = useAppContext()
  const inputRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true)
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative overflow-hidden pt-24'>
      <div className='text-center mt-20 mb-8'>
        {/* Animated badge with hover effects */}
        <div className={`
          inline-flex items-center group justify-center px-6 py-1.5 mb-4 
          border border-primary/40 bg-primary/10 rounded-full text-xs gap-4 text-primary
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          hover:scale-105 hover:bg-primary/20 hover:shadow-lg cursor-pointer
          animate-pulse
        `}>
          <p>AI-Powered Writing Assistant</p>
          <Sparkles className="h-4 w-4 text-primary transition-transform duration-300 group-hover:rotate-180" />
        </div>


        {/* Staggered title animation */}
        <h1 className={`text-3xl sm:text-6xl font-semibold sm:leading-16 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} `}>
          Share Your <span className='animated-gradient-text'>Vision</span><br />With the World
        </h1>

        <p className={`my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-600 transform transition-all duration-700 delay-400
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}>
          Publish your insights, build your audience, and engage with meaningful conversations. Your expertise deserves to be heard.
        </p>
        
        {/* Enhanced search form */}
        <form 
          onSubmit={onSubmitHandler} 
          className={`
            flex justify-between max-w-lg max-sm:scale-75 mx-auto 
            border border-gray-300 bg-white rounded overflow-hidden
            transform transition-all duration-300 delay-300
            ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}
            hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 focus-within:shadow-lg focus-within:border-primary/50
          `}
        >
          <input 
            ref={inputRef} 
            type="text" 
            className='w-full pl-4 outline-none transition-all duration-300 focus:pl-5' 
            placeholder='Explore articles, topics, and ideas...' 
            required 
          />
          <button 
            type="submit" 
            className='bg-primary text-white px-8 py-2 m-1.5 rounded 
              transition-all duration-300
              hover:scale-105 hover:shadow-lg 
              active:scale-95
              focus:ring-2 focus:ring-primary cursor-pointer focus:ring-offset-2 '
          >
            Discover
          </button>
        </form>
      </div>

      {/* Animated clear button */}
      <div className='text-center'>
        {input && (
          <button 
            onClick={onClear}
            className='
              border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm 
              transform transition-all duration-300
              hover:scale-110 hover:bg-red-50 hover:border-red-200 hover:text-red-600
              active:scale-95
              animate-bounce cursor-pointer
            '
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Animated background gradient */}
      <img 
        src={assets.gradientBackground} 
        alt="" 
        className={`
          absolute -top-50 -z-10
          transform transition-all duration-300
          ${isVisible ? 'opacity-60 scale-100' : 'opacity-50 scale-110'}
          animate-float
        `}
      />
    </div>
  )
}

export default Header