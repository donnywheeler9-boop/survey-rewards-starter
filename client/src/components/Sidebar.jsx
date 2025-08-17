import React from 'react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile',   label: 'Profile'   },
  { to: '/surveys',   label: 'Survey'    },
  { to: '/withdraw',  label: 'Withdraw'  },
]

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0">
      <div className="sticky top-16 bg-gray-900/90 border border-white/10 rounded-2xl p-3">
        <nav className="flex flex-col gap-2">
          {items.map(it => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition
                ${isActive
                  ? 'bg-purple-600/20 border border-purple-500 text-white'
                  : 'text-gray-300 hover:bg-white/5'}`
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
