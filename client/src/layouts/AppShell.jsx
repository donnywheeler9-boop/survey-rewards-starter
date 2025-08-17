import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import PointsBalance from '../components/PointsBalance'
import Footer from '../components/Footer'

export default function AppShell() {
  return (
    // ⬇️ height-সংক্রান্ত ইস্যু দূর করতে h-screen → min-h-screen
    <div className="min-h-screen flex bg-gray-900">
      {/* Fixed Sidebar (Navbar-এর নিচে বসবে) */}
      <aside
        className="
          fixed inset-y-0 left-0 w-64
          bg-gray-900 text-white p-4
          pt-20             /* ⬅️ Navbar height compensate (≈80px/5rem) */
          border-r border-white/10
        "
      >
        <Sidebar />
      </aside>

      {/* Right column (content area) */}
      <div
        className="
          flex-1 ml-64        /* ⬅️ Sidebar width offset */
          pt-20              /* ⬅️ Navbar height compensate */
          flex flex-col
        "
      >
        {/* Scrollable content section */}
        <div className="grow p-6 space-y-6">
          {/* Points Balance সব পেজে টপে */}
          <div className="sticky top-4 z-10">
            <PointsBalance />
          </div>

          {/* Route content loads here */}
          <Outlet />
        </div>

        {/* Footer main column-এর অংশ */}
        <Footer />
      </div>
    </div>
  )
}
