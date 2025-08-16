import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard() {
  const [points, setPoints] = useState(0)

  useEffect(() => {
    async function fetchPoints() {
      try {
        const res = await api.get('/user/points')
        setPoints(res.data.points)
      } catch (err) {
        console.error(err)
      }
    }
    fetchPoints()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md transform transition-all hover:scale-105 duration-300">
        <p className="text-lg">Your Points Balance:</p>
        <p className="text-3xl font-extrabold mt-2 text-purple-400">{points}</p>
      </div>
    </div>
  )
}
