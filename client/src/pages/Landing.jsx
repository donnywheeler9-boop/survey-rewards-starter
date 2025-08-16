import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Earn points by completing surveys.
          </h1>
          <p className="text-gray-600 mb-6">
            Join, answer quick surveys, collect points, and withdraw when you’re ready.
          </p>
          <div className="space-x-3">
            <Link className="px-4 py-2 rounded bg-gray-900 text-white" to="/signup">
              Get Started
            </Link>
            <Link className="px-4 py-2 rounded bg-gray-200" to="/login">
              I have an account
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <ul className="space-y-3 text-gray-700">
            <li>• Secure authentication (JWT)</li>
            <li>• Real-time points balance</li>
            <li>• Simple withdraw requests</li>
            <li>• Neon/Postgres backend API</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
