import React from 'react'
import { useSelector } from 'react-redux'
import { userUpdated } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'


const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {

      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        }
      )
      const data = await res.json();

      if(data.message) {
        toast.error(data.message);
      }
      else {
        toast.success('User updated successfully');
        dispatch(userUpdated(data));
        // navigate('/profile');
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font font-semibold text-center mt-8'>Profile</h1>

      <div className='flex flex-col gap-4 mt-4'>
        <img src={currentUser.avatar} alt="avatar" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <input type='text' onChange={handleChange} id='avatar' placeholder='Url for your new avatar...' className='border p-3 rounded-lg' />
      </div>

      <hr className='border-t-2 border-gray-300 my-8' />

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
        <input type="text" onChange={handleChange} id='username' placeholder='username' className='border p-3 rounded-lg' />
        <input type="email" onChange={handleChange} id='email' placeholder='email' className='border p-3 rounded-lg' />
        <input type="password" onChange={handleChange} id='password' placeholder='password' className='border p-3 rounded-lg' />
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