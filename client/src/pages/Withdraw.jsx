import React, { useEffect, useState } from 'react'
import api from '../api'
import WithdrawForm from '../components/WithdrawForm'

export default function Withdraw() {
  const [points, setPoints] = useState(0)

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await api.get('/user/me')
        setPoints(res.data.points)
      } catch (err) {
        console.error(err)
      }
    }
    fetchPoints()
  }, [])

  const handleWithdraw = (newBalance) => {
    setPoints(newBalance)
    alert('Withdraw successful!')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Withdraw Points</h1>
      <WithdrawForm currentPoints={points} onWithdraw={handleWithdraw} />
    </div>
  )
}
