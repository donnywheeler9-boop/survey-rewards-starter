import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      alert('Login successful')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-all hover:scale-105 duration-300">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-400 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-500 font-semibold transition-colors duration-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
