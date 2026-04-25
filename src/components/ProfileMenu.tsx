'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { signOut } from '@/app/login/actions'
import Image from 'next/image'

export default function ProfileMenu({ userEmail, avatarUrl }: { userEmail: string, avatarUrl: string | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface font-semibold hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary shadow-sm overflow-hidden relative"
        title={userEmail}
      >
        {avatarUrl ? (
          <Image src={avatarUrl} alt="Avatar" fill className="object-cover" sizes="40px" />
        ) : (
          userEmail?.charAt(0).toUpperCase() || 'U'
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-outline-variant/10">
            <p className="text-[10px] font-bold tracking-widest uppercase text-tertiary mb-1">Signed in as</p>
            <p className="text-sm font-medium text-inverse-surface truncate">{userEmail}</p>
          </div>
          <div className="p-2">
            <Link 
              href="/profile" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-left px-3 py-2 text-sm text-on-surface/80 hover:text-primary hover:bg-surface-container-low rounded-md transition-colors"
            >
              Profile Settings
            </Link>
            <form action={signOut}>
              <button 
                type="submit" 
                className="block w-full text-left px-3 py-2 text-sm text-[#d07023] hover:bg-surface-container-low rounded-md transition-colors font-medium mt-1"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
