import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Header = () => {
    const {currentUser} = useSelector((state) => state.user);
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-full mx-auto p-3 pl-6'>
                <Link to='/'>
                    <h1 className=' font-bold text-sm sm:text-3xl flex flex-wrap'>
                        <span className='text-slate-500'>Next</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                    />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:opacity-75 text-xl'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:opacity-75 text-xl'>
                            About
                        </li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                            <img
                                className='rounded-full h-9 w-9 object-cover pr-3'
                                src={currentUser.avatar}
                                alt='profile'
                            />
                        ) : (
                            <li className=' text-slate-700 text-xl hover:underline pr-3'> Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header