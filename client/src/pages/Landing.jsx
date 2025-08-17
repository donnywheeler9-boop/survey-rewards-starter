import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeInSection from '../components/FadeInSection'
import Footer from '../components/Footer' // ⬅️ added

export default function Landing() {
  return (
    // Navbar fixed থাকলে কনটেন্ট ঢেকে না ফেলতে top padding + footer নিচে রাখতে flex-col
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 pt-20 md:pt-24">
      {/* ===== Main (fills remaining height) ===== */}
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative min-h-screen bg-cover bg-center flex items-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1920&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-6xl font-extrabold leading-tight mb-4"
              >
                Earn Points by Completing Surveys
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-lg md:text-xl mb-6 text-gray-200"
              >
                Join, answer quick surveys, collect points, and withdraw when you’re ready.
              </motion.p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  to="/signup"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:scale-105 transition-transform font-semibold"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-full bg-white text-gray-900 shadow hover:scale-105 transition-transform font-semibold"
                >
                  I have an account
                </Link>
              </div>
            </div>

            {/* Right Content - Features */}
            <div className="flex-1 grid md:grid-cols-1 gap-6 mt-10 md:mt-0">
              <FadeInSection delay={0.2}>
                <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-lg text-white font-medium text-base md:text-lg">
                  • Secure authentication (JWT)
                </div>
              </FadeInSection>
              <FadeInSection delay={0.4}>
                <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-lg text-white font-medium text-base md:text-lg">
                  • Real-time points balance
                </div>
              </FadeInSection>
              <FadeInSection delay={0.6}>
                <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-lg text-white font-medium text-base md:text-lg">
                  • Simple withdraw requests
                </div>
              </FadeInSection>
              <FadeInSection delay={0.8}>
                <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-lg text-white font-medium text-base md:text-lg">
                  • Neon/Postgres backend API
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer (always at page bottom on landing) ===== */}
      <Footer />
    </div>
  )
}
