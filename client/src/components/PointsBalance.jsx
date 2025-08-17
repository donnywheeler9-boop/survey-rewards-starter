// client/src/components/PointsBalance.jsx
import React, { useEffect, useState } from 'react'
import api from '../api'

export default function PointsBalance() {
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchPoints = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await api.get('/user/points')
      setPoints(res.data.points ?? 0)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.error || 'Failed to load points')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPoints() }, [])

  return (
    <div className="points-balance w-full bg-gray-800/80 border border-white/10 rounded-xl p-4 md:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-300">Your Points Balance</p>
          <p className="text-2xl md:text-3xl font-extrabold mt-1 text-purple-400">
            {points}
          </p>
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>

        <button
          onClick={fetchPoints}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </div>
  )
}
