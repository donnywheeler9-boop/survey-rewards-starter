// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard() {
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchPoints() {
    try {
      setError('')
      setLoading(true)
      const res = await api.get('/user/points') // server: GET /api/user/points
      setPoints(res.data.points ?? 0)
    } catch (err) {
      console.error(err)
      const msg = err?.response?.data?.error || 'Failed to load points'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPoints()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold">Dashboard</h1>

        {/* Card: Points balance */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-300">Your Points Balance</p>
            {loading ? (
              <p className="text-3xl font-extrabold mt-2 animate-pulse">...</p>
            ) : (
              <p className="text-3xl font-extrabold mt-2 text-purple-400">{points}</p>
            )}
            {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
          </div>
          <button
            onClick={fetchPoints}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Placeholder: upcoming sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Surveys</h2>
            <p className="text-gray-400 text-sm">Coming soon: available surveys list</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Withdraw</h2>
            <p className="text-gray-400 text-sm">Coming soon: recent withdraw requests</p>
          </div>
        </div>
      </div>
    </div>
  )
}
