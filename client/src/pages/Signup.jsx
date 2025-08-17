import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // logged-in হলে এই পেজে আসলে সরাসরি dashboard
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/signup', { name, email, password })
      if (!data?.token) throw new Error('No token returned')
      localStorage.setItem('token', data.token)
      window.dispatchEvent(new Event('auth-changed'))   // ⬅️ Navbar refresh
      navigate('/dashboard', { replace: true })         // ⬅️ redirect
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-2xl space-y-4">
        <h1 className="text-2xl font-bold">Create account</h1>
        {error && <p className="text-sm text-red-400">{error}</p>}

        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition disabled:opacity-60"
        >
          {loading ? 'Creating…' : 'Sign up'}
        </button>

        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-300 underline">Login</Link>
        </p>
      </form>
    </div>
  )
}
