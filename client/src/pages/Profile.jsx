import React, { useState } from 'react'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('account')

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <div>Account settings will be here.</div>
      case 'withdraw-history':
        return <div>Withdraw history will be here.</div>
      case 'earning-history':
        return <div>Earning history will be here.</div>
      case 'total-surveys':
        return <div>Total completed surveys will be here.</div>
      case 'current-balance':
        return <div>Current balance details will be here.</div>
      default:
        return <div>Profile settings will be here.</div>
    }
  }

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p className="text-gray-300 mb-6">Coming soon: profile details & settings.</p>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('account')}
          className={`py-2 px-4 rounded-lg transition-colors ${activeTab === 'account' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab('withdraw-history')}
          className={`py-2 px-4 rounded-lg transition-colors ${activeTab === 'withdraw-history' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Withdraw History
        </button>
        <button
          onClick={() => setActiveTab('earning-history')}
          className={`py-2 px-4 rounded-lg transition-colors ${activeTab === 'earning-history' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Earning History
        </button>
        <button
          onClick={() => setActiveTab('total-surveys')}
          className={`py-2 px-4 rounded-lg transition-colors ${activeTab === 'total-surveys' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Total Surveys
        </button>
        <button
          onClick={() => setActiveTab('current-balance')}
          className={`py-2 px-4 rounded-lg transition-colors ${activeTab === 'current-balance' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Current Balance
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 bg-gray-800 rounded-xl border border-white/10">
        {renderContent()}
      </div>
    </div>
  )
}
