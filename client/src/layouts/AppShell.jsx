import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function AppShell() {
  return (
    <div className="pt-16"> {/* fixed navbar space */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6">
          <Sidebar />
          <main className="flex-1 min-h-[calc(100vh-6rem)] bg-gray-800/60 border border-white/10 rounded-2xl p-4">
            <Outlet /> {/* মাঝখানের কনটেন্ট এখানেই রেন্ডার হবে */}
          </main>
        </div>
      </div>
    </div>
  )
}
