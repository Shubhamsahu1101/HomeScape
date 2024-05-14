import React from 'react'
import { useSelector } from 'react-redux'
import { userUpdated, userDeleted, userLoggedOut } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleUpdate = async (e) => {
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

      if (data.message) {
        toast.error(data.message);
      }
      else {
        toast.success('User updated successfully');
        dispatch(userUpdated(data));
        navigate('/profile');
      }

    } catch (error) {
      console.log(error);
      toast.error('User could not be updated');
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout');
      const data = await res.json();
      if (data.message) {
        toast.error(data.message);
      }
      else {
        toast.success('User logged out successfully');
        dispatch(userLoggedOut(data));
      }
    } catch (error) {
      console.log(error);
      toast.error('User could not be logged out');
    }
  }

  const deleteDialog = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      } else {
        return toast.error('User not deleted');
      }
    });
  }

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/user/delete/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      )
      const data = await res.json();

      if (data.message) {
        toast.error(data.message);
      }
      else {
        toast.success('User deleted successfully');
        dispatch(userDeleted(data));
      }

    } catch (error) {
      console.log(error);
      toast.error('User could not be deleted');
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

      <form onSubmit={handleUpdate} className='flex flex-col gap-4 mt-4'>
        <input type="text" onChange={handleChange} id='username' placeholder='username' className='border p-3 rounded-lg' />
        <input type="email" onChange={handleChange} id='email' placeholder='email' className='border p-3 rounded-lg' />
        <input type="password" onChange={handleChange} id='password' placeholder='password' className='border p-3 rounded-lg' />
        <button type='submit' disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>{loading ? "Loading..." : "Update"}</button>
      </form>

      <hr className='border-t-2 border-gray-300 my-8' />

      <div className='flex gap-4 mt-4'>
        <Link to='/my-listings' className='bg-green-500 flex flex-1 text-white p-3 rounded-lg hover:opacity-95 justify-center' >
          <button disabled={loading} >My Listings</button>
        </Link>
        <button disabled={loading} onClick={handleLogout} className='bg-red-500 flex-1 text-white p-3 rounded-lg hover:opacity-95'>Logout</button>
        <button disabled={loading} onClick={deleteDialog} className='bg-black flex-1 text-white p-3 rounded-lg hover:opacity-95'>Delete Account</button>
      </div>
    </div>
  )
}

export default Profile