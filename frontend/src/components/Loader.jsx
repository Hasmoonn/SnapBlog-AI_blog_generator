import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='relative'>
        <div className='animate-pulse rounded-full h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'></div>
        <div className='absolute top-0 left-0 animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-white border-r-white opacity-30'></div>
      </div>
      <p className='mt-6 text-gray-600 font-medium animate-pulse'>Loading amazing content...</p>
    </div>
  )
}

export default Loader