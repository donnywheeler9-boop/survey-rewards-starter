import React, { useState } from 'react'
import api from '../api'

export default function WithdrawForm({ currentPoints, onWithdraw }) {
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/withdraw', { amount: Number(amount) })
      onWithdraw(res.data.newBalance)
      setAmount('')
    } catch (err) {
      console.error(err)
      alert('Withdraw failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="font-bold mb-2">Withdraw Points</h2>
      <p>Current Points: {currentPoints}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Withdraw
      </button>
    </form>
  )
}
