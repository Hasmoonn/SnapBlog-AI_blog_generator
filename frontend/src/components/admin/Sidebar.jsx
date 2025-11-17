import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-white border-r border-gray-100 min-h-full py-6 shadow-sm'>
      {/* Navigation Links */}
      <nav className='flex-1 space-y-1 px-3'>
        <NavLink end={true} to='/admin' className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-6 rounded-xl mx-2 transition-all duration-200 group ${isActive ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 text-blue-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} `}
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
              }`}>
                <img src={assets.home_icon} alt="Dashboard" className='w-4 h-4' />
              </div>
              <p className='hidden md:inline-block font-medium'>Dashboard</p>
            </>
          )}
        </NavLink>

        <NavLink to='/admin/addBlog' className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-6 rounded-xl mx-2 transition-all duration-200 group ${isActive ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} `}
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-lg transition-colors ${
                isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 group-hover:bg-green-100 group-hover:text-green-600'
              }`}>
                <img src={assets.add_icon} alt="Add Blogs" className='w-4 h-4' />
              </div>
              <p className='hidden md:inline-block font-medium'>Add Blogs</p>
            </>
          )}
        </NavLink>

        <NavLink to='/admin/listBlog' className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-6 rounded-xl mx-2 transition-all duration-200 group ${isActive ? "bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 text-orange-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-lg transition-colors ${
                isActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600'
              }`}>
                <img src={assets.list_icon} alt="Blog Lists" className='w-4 h-4' />
              </div>
              <p className='hidden md:inline-block font-medium'>Blog Lists</p>
            </>
          )}
        </NavLink>

        <NavLink to='/admin/comments'  className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-6 rounded-xl mx-2 transition-all duration-200 group ${isActive ? "bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-purple-500 text-purple-600 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900" } `}
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-lg transition-colors ${
                isActive ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'
              }`}>
                <img src={assets.comment_icon} alt="Comments" className='w-4 h-4' />
              </div>
              <p className='hidden md:inline-block font-medium'>Comments</p>
            </>
          )}
        </NavLink>
      </nav>

      {/* User Profile Section */}
      <div className='px-3 mt-8'>
        <div className='flex items-center gap-3 py-3 px-3 md:px-6 rounded-xl bg-gray-50 mx-2'>
          <div className='w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center'>
            <span className='text-white text-xs font-medium'>A</span>
          </div>
          <div className='hidden md:block'>
            <p className='text-sm font-medium text-gray-900'>Admin User</p>
            <p className='text-xs text-gray-500'>Administrator</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar