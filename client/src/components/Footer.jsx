import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between text-sm">
        {/* Left: copyright */}
        <div className="font-medium">
          © {year} <span className="lowercase">surveyrewards</span>
        </div>

        {/* Right: inline links */}
        <nav className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-white transition">Data Privacy</Link>
          <Link to="/terms" className="hover:text-white transition">Terms</Link>
          <Link to="/imprint" className="hover:text-white transition">Imprint</Link>
          <a href="#" className="hover:text-white transition">Do not sell my personal info</a>
        </nav>
      </div>
    </footer>
  );
}
