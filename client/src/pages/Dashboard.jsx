import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
export default function Dashboard() {
  const [me, setMe] = useState(null)
  const [surveys, setSurveys] = useState([])
  const [msg, setMsg] = useState('')
  useEffect(() => { (async () => { const { data } = await api.get('/me'); setMe(data); const s = await api.get('/surveys'); setSurveys(s.data) })() }, [])
  const complete = async (id) => {
    setMsg('')
    try { const { data } = await api.post(`/surveys/${id}/complete`); setMsg(`Completed! +${data.reward} points`); const me2 = await api.get('/me'); setMe(me2.data) }
    catch (e) { setMsg(e.response?.data?.message || 'Error') }
  }
  return (<div className="max-w-6xl mx-auto p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <Link to="/withdraw" className="px-3 py-2 rounded bg-blue-600 text-white">Withdraw</Link>
    </div>
    {me && (<div className="mb-6 bg-white p-4 rounded-xl shadow flex items-center justify-between">
      <div><p className="text-gray-600">Welcome</p><p className="font-semibold">{me.email}</p></div>
      <div className="text-right"><p className="text-gray-600">Points</p><p className="text-2xl font-bold">{me.points}</p></div>
    </div>)}
    <div className="grid md:grid-cols-2 gap-4">
      {surveys.map(s => (<div key={s.id} className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold">{s.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{s.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm">Reward: <strong>{s.reward}</strong></span>
          <button onClick={() => complete(s.id)} className="px-3 py-1 rounded bg-gray-900 text-white">Complete</button>
        </div>
      </div>))}
    </div>
    {msg && <p className="mt-4 text-green-700">{msg}</p>}
  </div>)
}
