// client/src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AppShell from './layouts/AppShell'

import LandingPage from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Withdraw from './pages/Withdraw'
import Profile from './pages/Profile'
import Surveys from './pages/Surveys'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected with sidebar + footer inside AppShell */}
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Route>
      </Routes>
      {/* ⛔ এখানে আর <Footer /> রাখবেন না */}
    </Router>
  )
}

export default App
