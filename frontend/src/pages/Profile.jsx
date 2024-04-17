import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  console.log("avatar", currentUser.avatar)
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font font-semibold text-center mt-8'>Profile</h1>

      <div className='flex flex-col gap-4 mt-4'>
        <img src={currentUser.avatar} alt="avatar" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <input type='text' id='avatar' placeholder='Url for your new avatar...' className='border p-3 rounded-lg' />
      </div>

      <hr className='border-t-2 border-gray-300 my-8' />

      <form className='flex flex-col gap-4 mt-4'>
        <input type="text" id='username' placeholder='username' className='border p-3 rounded-lg' />
        <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg' />
        <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg' />
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>Update</button>
      </form>

      <hr className='border-t-2 border-gray-300 my-8' />

      <div className='flex gap-4 mt-4'>
        <button className='bg-red-500 min-w-32 text-white p-3 rounded-lg hover:opacity-95'>Logout</button>
        <button className='bg-red-800 min-w-32 text-white p-3 rounded-lg hover:opacity-95'>Delete Account</button>
      </div>
    </div>
  )
}

export default Profile