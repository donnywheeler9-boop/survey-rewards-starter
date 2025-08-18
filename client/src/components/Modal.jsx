import React, { useEffect, useRef } from 'react'

/**
 * A lightweight accessible modal.
 * - Closes on overlay click, ESC press
 * - Focus is moved to the modal on open, and returned on close
 */
export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  const dialogRef = useRef(null)
  const lastActiveRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    if (open) {
      lastActiveRef.current = document.activeElement
      window.addEventListener('keydown', onKey)
      setTimeout(() => dialogRef.current?.focus(), 0)
      // Lock body scroll
      document.body.style.overflow = 'hidden'
    } else {
      window.removeEventListener('keydown', onKey)
      // Unlock body scroll
      document.body.style.overflow = ''
      // Restore focus
      lastActiveRef.current?.focus?.()
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative ${maxWidth} w-full mx-4 rounded-2xl bg-gray-900 border border-white/10 shadow-xl`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 id="modal-title" className="text-white font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-md text-gray-300 hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-4 text-gray-200 leading-relaxed overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  )
}