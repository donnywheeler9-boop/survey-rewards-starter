// client/src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Survey Rewards</h2>
          <p className="text-gray-400 text-sm">
            Earn points, complete surveys, and withdraw your rewards easily. Secure and fast platform.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/signup" className="hover:text-white transition">Sign Up</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@surveyrewards.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Survey St, City, Country</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Survey Rewards. All rights reserved.
      </div>
    </footer>
  )
}
