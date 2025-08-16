// client/src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-black/70 backdrop-blur-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">SurveyRewards</Link>
        <div className="space-x-4">
          <Link to="/signup" className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition">Sign Up</Link>
          <Link to="/login" className="px-4 py-2 rounded bg-gray-200 text-gray-900 hover:bg-gray-300 transition">Login</Link>
        </div>
      </div>
    </nav>
  )
}
