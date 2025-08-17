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
                  • Get paid in under 10 minutes
                </div>
              </FadeInSection>
              <FadeInSection delay={0.4}>
                <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-lg text-white font-medium text-base md:text-lg">
                  • Highest survey completion rates
                </div>
              </FadeInSection>
              <FadeInSection delay={0.6}>
                <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-lg text-white font-medium text-base md:text-lg">
                  • Works for everyone
                </div>
              </FadeInSection>
              <FadeInSection delay={0.8}>
                <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-lg text-white font-medium text-base md:text-lg">
                  • Less frustration
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* ======== Value Cards Section (below hero) ======== */}
{/* ==== Join us now (cards) ==== */}
<section className="py-20 bg-gray-900">
  <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
    Join us now!
  </h2>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
    {/* Card 1 */}
    <article className="rounded-[28px] bg-amber-100 text-gray-900 shadow-xl overflow-hidden">
      {/* Text area */}
      <div className="p-8">
        <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
          1000s of surveys<br />available
        </h3>
        <p className="mt-4 text-gray-700">
          Thousands of surveys are available daily, perfectly matched to your profile.
        </p>
      </div>

      {/* Visual stage (kept separate so text never overlaps) */}
      <div className="relative h-56 md:h-64 select-none pointer-events-none">
        <img
          src="https://www.nicesurveys.com/templates/nicesurvey/assets/logout/img/feature1.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
    </article>

    {/* Card 2 */}
    <article className="rounded-[28px] bg-sky-100 text-gray-900 shadow-xl overflow-hidden">
      <div className="p-8">
        <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Earn real cash or<br />gift cards
        </h3>
        <p className="mt-4 text-gray-700">
          Choose from over 150+ gift cards including paypal venmo and amazon.
        </p>
      </div>

      <div className="relative h-56 md:h-64 select-none pointer-events-none">
        <img
          src="https://www.nicesurveys.com/templates/nicesurvey/assets/logout/img/feature2.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
    </article>

    {/* Card 3 */}
    <article className="rounded-[28px] bg-emerald-100 text-gray-900 shadow-xl overflow-hidden">
      <div className="p-8">
        <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Get paid for your<br />time
        </h3>
        <p className="mt-4 text-gray-700">
          Our survey matching results in higher earnings per hour compared to other platforms.
        </p>
      </div>

      <div className="relative h-56 md:h-64 select-none pointer-events-none">
        <img
          src="https://www.nicesurveys.com/templates/nicesurvey/assets/logout/img/feature3.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
    </article>
  </div>

  {/* CTA */}
  <div className="flex justify-center mt-12">
    <a
      href="/signup"
      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-lg"
    >
      Sign up now →
    </a>
  </div>
</section>

<section className="py-20 bg-gradient-to-r from-gray-800 via-indigo-700 to-purple-600">
  <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-8">
    Also available on Android and iOS
  </h2>

  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-16">
    {/* Left Text */}
    <div className="text-center md:text-left max-w-lg space-y-4">
      <p className="text-lg text-white opacity-90">
        Earn from anywhere, whether you’re waiting for the bus or watching TV. Download the app and take surveys wherever you like.
      </p>

      {/* Buttons for App Store & Google Play */}
      <div className="flex justify-center md:justify-start gap-4">
        <a
          href="https://www.apple.com/app-store/"
          className="w-40 h-12 rounded-lg overflow-hidden border-none shadow-md"
        >
          <img
            src="https://www.nicesurveys.com/templates/nicesurvey/assets/logout/img/App_Store.png"
            alt="Download on the App Store"
            className="w-full h-full object-cover"
          />
        </a>
        <a
          href="https://play.google.com/"
          className="w-40 h-12 rounded-lg overflow-hidden border-none shadow-md"
        >
          <img
            src="https://www.nicesurveys.com/templates/nicesurvey/assets/logout/img/Google_Play.png"
            alt="Get it on Google Play"
            className="w-full h-full object-cover"
          />
        </a>
      </div>
    </div>

    {/* Right Image: Mobile Phones */}
    <div className="flex justify-center items-center space-x-8">
      {/* Mobile Phones */}
      <div className="relative w-48 h-80 rounded-xl overflow-hidden bg-white shadow-md">
        <img
          src="https://www.nicesurveys.com/templates/nicesurvey/assets/logout/img/phone-1.png"
          alt="Survey app"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Payment UI */}
      <div className="relative w-48 h-80 rounded-xl overflow-hidden bg-white shadow-md">
        <img
          src="https://www.nicesurveys.com/templates/nicesurvey/assets/logout/img/phone-2.png"
          alt="Survey payment UI"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>



      </main>

      {/* ===== Footer (always at page bottom on landing) ===== */}
      <Footer />
    </div>
  )
}
