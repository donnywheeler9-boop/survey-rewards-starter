// client/src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  ClipboardList,
  Wallet,
} from "lucide-react"; // <-- modern eye-catching icons

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/surveys", label: "Survey", icon: ClipboardList },
  { to: "/withdraw", label: "Withdraw", icon: Wallet },
];

function Item({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => [
        "w-full flex items-center gap-3 rounded-xl px-4 py-2 font-semibold transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-0",
        isActive
          ? "bg-purple-600 text-white shadow ring-1 ring-purple-400/60"
          : "text-gray-200 hover:bg-white/10 ring-1 ring-white/10",
      ].join(" ")}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64">
      <nav className="grid gap-2">
        {navItems.map((it) => (
          <Item key={it.to} {...it} />
        ))}
      </nav>
    </aside>
  );
}

/*
USAGE:
1. Install Lucide React:
   npm install lucide-react

2. Replace your Sidebar.jsx with this code.

3. Done — modern, sharp Lucide icons will appear beside each menu item.
*/
