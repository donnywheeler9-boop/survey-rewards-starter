import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard() {
  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await api.get('/surveys')
        setSurveys(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSurveys()
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Surveys</h2>
      <ul className="space-y-2">
        {surveys.map(s => (
          <li key={s.id} className="p-4 border rounded">{s.title}</li>
        ))}
      </ul>
    </div>
  )
}
