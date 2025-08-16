import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const logout = () => { localStorage.removeItem('token'); navigate('/'); }
  return (<nav className="bg-white border-b shadow-sm">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <Link to="/" className="font-bold text-xl">Survey Rewards</Link>
      <div className="space-x-4">
        {!token && <Link className="px-3 py-1 rounded bg-gray-900 text-white" to="/login">Login</Link>}
        {!token && <Link className="px-3 py-1 rounded bg-gray-200" to="/signup">Sign Up</Link>}
        {token && <Link className="px-3 py-1 rounded bg-gray-200" to="/dashboard">Dashboard</Link>}
        {token && <Link className="px-3 py-1 rounded bg-gray-200" to="/withdraw">Withdraw</Link>}
        {token && <button className="px-3 py-1 rounded bg-red-500 text-white" onClick={logout}>Logout</button>}
      </div>
    </div>
  </nav>)
}
