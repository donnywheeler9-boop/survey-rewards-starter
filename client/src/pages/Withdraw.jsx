// client/src/pages/Withdraw.jsx
import React, { useState, useEffect } from 'react'
import api from '../api'

export default function Withdraw() {
  const [points, setPoints] = useState(0)
  const [amount, setAmount] = useState('')

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

  const handleWithdraw = async (e) => {
    e.preventDefault()
    try {
      await api.post('/user/withdraw', { amount: Number(amount) })
      alert('Withdraw request submitted!')
      setAmount('')
    } catch (err) {
      alert('Withdraw failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Withdraw Your Points</h1>

      <div className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <p className="text-gray-300 mb-4">Available Points: <span className="text-purple-400 font-bold">{points}</span></p>
        
        <form onSubmit={handleWithdraw} className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount to withdraw"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  )
}
