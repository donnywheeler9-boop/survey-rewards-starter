import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'
export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault(); setErr('')
    try { const { data } = await api.post('/auth/login', { email, password }); localStorage.setItem('token', data.token); navigate('/dashboard') }
    catch (e) { setErr(e.response?.data?.message || 'Login failed') }
  }
  return (<div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-2xl shadow">
    <h2 className="text-2xl font-semibold mb-4">Login</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button className="w-full bg-gray-900 text-white py-2 rounded">Sign In</button>
    </form>
    <p className="text-sm mt-3">No account? <Link className="underline" to="/signup">Sign up</Link></p>
  </div>)
}
