import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'

const App = () => {
  return (
    <div>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App