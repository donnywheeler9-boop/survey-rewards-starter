import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'))

  // একই ট্যাবে রাউট পরিবর্তন/লগইন-লগআউটে UI আপডেটের জন্য
  useEffect(() => {
    const check = () => setAuthed(!!localStorage.getItem('token'))
    check()
    // custom event (নিচে Login/Signup/Logout থেকে dispatch করবো)
    window.addEventListener('auth-changed', check)
    // route change-এও রিফ্রেশ করি
    return () => window.removeEventListener('auth-changed', check)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('auth-changed'))
    navigate('/login', { replace: true })
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-gray-900/95 border-b border-white/10 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold text-white">
          SurveyRewards
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {authed ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
