// client/src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authed, setAuthed] = useState(!!localStorage.getItem("token"));

  // একই ট্যাবে রাউট পরিবর্তন/লগইন-লগআউটে UI আপডেটের জন্য
  useEffect(() => {
    const check = () => setAuthed(!!localStorage.getItem("token"));
    check();
    window.addEventListener("auth-changed", check);
    return () => window.removeEventListener("auth-changed", check);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/login", { replace: true });
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-gray-900/95 border-b border-white/10 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white">
          <Home className="h-5 w-5" />
          <span>SurveyRewards</span>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {authed ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold transition"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
