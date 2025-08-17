// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import api from '../api'
import SurveyCard from '../components/SurveyCard' // ← needed for the list

export default function Dashboard() {
  const [points, setPoints] = useState(0)
  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchPoints() {
    const res = await api.get('/user/points') // GET /api/user/points
    setPoints(res.data.points ?? 0)
  }

  async function fetchSurveys() {
    const res = await api.get('/surveys') // GET /api/surveys (protected)
    setSurveys(res.data || [])
  }

  async function refreshAll() {
    try {
      setError('')
      setLoading(true)
      await Promise.all([fetchPoints(), fetchSurveys()])
    } catch (err) {
      console.error(err)
      const msg = err?.response?.data?.error || 'Failed to load data'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshAll()
  }, [])

  async function handleComplete(id) {
    try {
      await api.post(`/surveys/${id}/complete`) // POST /api/surveys/:id/complete
      await refreshAll()
    } catch (err) {
      console.error(err)
      alert(err?.response?.data?.error || 'Failed to complete survey')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold">Dashboard</h1>

        {/* Points balance */}
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
            onClick={refreshAll}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Surveys list */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Available Surveys</h2>
          {loading ? (
            <p className="text-gray-400">Loading surveys...</p>
          ) : surveys.length === 0 ? (
            <p className="text-gray-400">No active surveys right now.</p>
          ) : (
            <div className="space-y-4">
              {surveys.map((s) => (
                <SurveyCard key={s.id} survey={s} onComplete={handleComplete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
