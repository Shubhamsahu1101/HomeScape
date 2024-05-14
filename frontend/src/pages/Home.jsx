import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='/create-listing' className='bg-green-500 w-32 text-white p-3 m-16 rounded-lg hover:opacity-95 block'>Create Listing</Link>
    </div>
  )
}

export default Home