import React, { useEffect, useState } from 'react'
import api from '../api'
export default function Withdraw() {
  const [amount, setAmount] = useState('')
  const [list, setList] = useState([])
  const [msg, setMsg] = useState('')
  const load = async () => { const { data } = await api.get('/withdraws'); setList(data) }
  useEffect(() => { load() }, [])
  const submit = async (e) => {
    e.preventDefault(); setMsg('')
    try { await api.post('/withdraw', { amount: Number(amount) }); setAmount(''); setMsg('Withdraw request submitted'); load() }
    catch (e) { setMsg(e.response?.data?.message || 'Error') }
  }
  return (<div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-semibold mb-4">Withdraw</h2>
    <form onSubmit={submit} className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex gap-3">
        <input className="flex-1 border p-2 rounded" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
        <button className="px-4 py-2 rounded bg-gray-900 text-white">Request</button>
      </div>
    </form>
    <div className="bg-white rounded-xl shadow">
      <table className="w-full text-left">
        <thead><tr className="border-b"><th className="p-3">ID</th><th className="p-3">Amount</th><th className="p-3">Status</th><th className="p-3">Date</th></tr></thead>
        <tbody>
          {list.map(w => (<tr key={w.id} className="border-b">
            <td className="p-3">{w.id}</td><td className="p-3">{w.amount}</td>
            <td className="p-3 capitalize">{w.status}</td>
            <td className="p-3">{new Date(w.created_at).toLocaleString()}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
    {msg && <p className="mt-4 text-green-700">{msg}</p>}
  </div>)
}
