// client/src/pages/Profile.jsx
import React, { useEffect, useState } from 'react'
import api from '../api'
import {
  User, Mail, Globe,
  Wallet, History, BarChart3, ClipboardList
} from 'lucide-react'   // ✅ modern icons

export default function Profile() {
  const [activeTab, setActiveTab] = useState('account')
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await api.get('/user/profile')
      setProfileData(res.data)
    } catch (err) {
      console.error('Error fetching profile data:', err)
      setError(err?.response?.data?.error || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProfileData() }, [])

  const renderContent = () => {
    if (loading) return <p>Loading profile...</p>
    if (error) return <p className="text-red-400">{error}</p>

    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-purple-400" />
              <span><strong>Name:</strong> {profileData?.user?.name ?? '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-400" />
              <span><strong>Email:</strong> {profileData?.user?.email ?? '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-400" />
              <span><strong>IP Address:</strong> {profileData?.user?.ip_address ?? '—'}</span>
            </div>
          </div>
        )
      case 'withdraw-history':
        return (
          <div className="flex items-center gap-2 text-gray-300">
            <History className="h-4 w-4 text-green-400" />
            <span>Withdraw history will be here.</span>
          </div>
        )
      case 'earning-history':
        return (
          <div className="flex items-center gap-2 text-gray-300">
            <BarChart3 className="h-4 w-4 text-yellow-400" />
            <span>Earning history will be here.</span>
          </div>
        )
      case 'total-surveys':
        return (
          <div className="flex items-center gap-2 text-gray-300">
            <ClipboardList className="h-4 w-4 text-blue-400" />
            <span>Total completed surveys: {profileData?.totalSurveys ?? 0}</span>
          </div>
        )
      case 'current-balance':
        return (
          <div className="flex items-center gap-2 text-gray-300">
            <Wallet className="h-4 w-4 text-purple-400" />
            <span>Current Balance: {profileData?.currentBalance ?? 0}</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p className="text-gray-300 mb-6">Coming soon: profile details & settings.</p>

      <div className="flex gap-4 mb-6">
        {[
          ['account','Account'],
          ['withdraw-history','Withdraw History'],
          ['earning-history','Earning History'],
          ['total-surveys','Total Surveys'],
          ['current-balance','Current Balance'],
        ].map(([key,label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-2 px-4 rounded-lg transition-colors ${
              activeTab === key ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-6 bg-gray-800 rounded-xl border border-white/10">
        {renderContent()}
      </div>
    </div>
  )
}
