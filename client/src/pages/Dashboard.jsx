// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard() {
  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchSurveys = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await api.get('/surveys')
      setSurveys(res.data || [])
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.error || 'Failed to fetch surveys')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSurveys() }, [])

  return (
    <div className="text-white space-y-6">
      <h1 className="text-4xl font-extrabold">Dashboard</h1>

      {/* আর এখানে আর PointsBalance দেখাব না; সেটা AppShell-এর টপে আছে */}

      <section className="bg-gray-800/80 border border-white/10 rounded-xl p-5">
        <h2 className="text-2xl font-bold mb-4">Available Surveys</h2>
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && !surveys.length && (
          <p className="text-gray-400">No active surveys right now.</p>
        )}
        <div className="space-y-4">
          {surveys.map((s) => (
            <div key={s.id} className="bg-gray-900/60 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-gray-400">{s.description}</p>
                <p className="text-xs mt-1">Reward: +{s.points} points</p>
              </div>
              {s.completed ? (
                <span className="px-3 py-1 rounded-md bg-gray-700 text-gray-300">Done</span>
              ) : (
                <button
                  onClick={async () => {
                    try {
                      await api.post(`/surveys/${s.id}/complete`)
                      fetchSurveys()
                    } catch (e) {
                      console.error(e)
                      alert(e?.response?.data?.error || 'Failed to complete')
                    }
                  }}
                  className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700"
                >
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
