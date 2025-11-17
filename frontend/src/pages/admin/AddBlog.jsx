import React, { useEffect, useRef, useState } from 'react'
import {assets, blogCategories} from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import {parse} from 'marked'

const AddBlog = () => {

  const {axios} = useAppContext()

  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)


  const generateContent = async () => {
    if (!title) {
      return toast.error('please enter a title')
    }

    try {
      setLoading(true)

      const {data} = await axios.post('/api/blog/generate', { prompt:title })

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onSUbmitHandler = async (e) => {
    e.preventDefault()

    try {
      setIsAdding(true)

      const blog = {
        title, subTitle, 
        description: quillRef.current.root.innerHTML,
        category, isPublished
      }

      const formData = new FormData();

      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const {data} = await axios.post(`/api/blog/add`, formData)

      if (data.success) {
        toast.success(data.message)
        setImage(false)
        setTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }

  useEffect(() => {
    // initiate Quill only once 
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  }, [])

  return (
    <form onSubmit={onSUbmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        {/* Header */}
          <div className='text-start text-primary mb-8'>
            <h1 className='text-3xl font-bold'>Create New Blog</h1>
            <p className='text-gray-600 mt-2'>Share your thoughts with the world</p>
          </div>

          {/* Thumbnail Upload */}
          <div className='mb-8 max-w-lg'>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Blog Thumbnail
            </label>
            <label htmlFor="image" className='cursor-pointer block'>
              <div className='border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors'>
                {!image ? (
                  <div className='flex flex-col items-center'>
                    <img src={assets.upload_area} alt="Upload" className='h-16 mb-3 opacity-60' />
                    <p className='text-gray-500'>Click to upload thumbnail</p>
                    <p className='text-sm text-gray-400 mt-1'>PNG, JPG, WEBP up to 10MB</p>
                  </div>
                ) : (
                  <div className='flex flex-col items-center'>
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt="Preview" 
                      className='h-32 rounded-lg shadow-md mb-3 object-cover' 
                    />
                    <p className='text-green-600 font-medium'>Image selected</p>
                  </div>
                )}
              </div>
              <input 
                onChange={e => setImage(e.target.files[0])} 
                type="file" 
                id='image' 
                hidden 
                required 
              />
            </label>
          </div>

        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' value={title} onChange={e => setTitle(e.target.value)}/>

        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' value={subTitle} onChange={e => setSubTitle(e.target.value)}/>

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          {
            loading && (
              <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
                <div className='h-8 w-8 rounded-full border-2 border-t-white animate-spin'></div>
              </div>
            )
          }
          <button type='button' disabled={loading} onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded cursor-pointer'>Generate with AI</button>
        </div>

        {/* Category & Publish Settings */}
        <div className='grid md:grid-cols-2 gap-6 mt-6 max-w-lg'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Blog Category
            </label>
            <select onChange={e => setCategory(e.target.value)}
              className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
            >
              <option value="">Select category</option>
              {
                blogCategories.map((item, index) => {
                  return <option key={index} value={item}>{item}</option>
                })
              }
            </select>
          </div>

          <div className='flex items-center justify-between p-3 border border-gray-300 rounded-xl'>
            <div>
              <p className='font-medium text-gray-700'>Publish Now</p>
              <p className='text-sm text-gray-500'>Make blog visible to readers</p>
            </div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input 
                type="checkbox" 
                checked={isPublished}
                onChange={e => setIsPublished(e.target.checked)}
                className='sr-only peer'
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/80"></div>
            </label>
          </div>
        </div>

        <button disabled={isAdding} type='submit' className='mt-8 md:max-w-lg w-full h-10 bg-primary hover:bg-primary/90 transition-all text-white rounded text-sm font-medium cursor-pointer'>
          {isAdding ? "Adding..." : 'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default AddBlog