"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleNavClick = () => {
    setIsOpen(false)
  }

  const navItems = [
    { name: 'Browse All', href: '/' },
    { name: 'Pattern Calculator', href: '/pattern-calculator' },
  ]

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden w-full bg-surface-container-low flex items-center justify-between px-6 pt-6 pb-4 border-b border-outline-variant/15 shrink-0 z-20 relative">
        <Link href="/" className="text-3xl font-serif tracking-tight font-medium text-primary hover:opacity-80 transition-opacity">
          Loom &amp; Craft
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-on-surface hover:bg-surface-container rounded-lg"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Desktop static, Mobile off-canvas) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[80vw] max-w-[340px] bg-surface-container-low flex flex-col pt-8 md:pt-12 pb-8 border-r border-outline-variant/15 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-[340px] md:shrink-0 md:z-20
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'}
        `}
      >
        <div className="px-6 md:px-10 mb-8 md:mb-16 flex items-center justify-between">
          <Link href="/" onClick={handleNavClick} className="text-3xl md:text-4xl font-serif tracking-tight font-medium text-primary hover:opacity-80 transition-opacity">
            Loom &amp; Craft
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-lg"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-4 md:px-6 space-y-2 md:space-y-3">
          {navItems.map((item) => {
            const isActive = item.href === '/' 
              ? pathname === '/' 
              : pathname?.startsWith(item.href)
            
            return (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={handleNavClick}
                className={`block px-5 py-3.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-surface-container text-on-surface font-semibold' 
                    : 'text-on-surface/80 font-medium hover:bg-surface-container'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
