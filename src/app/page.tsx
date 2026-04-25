import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* Left Sidebar Dashboard -> Top Nav on Mobile */}
      <aside className="w-full md:w-[340px] h-auto md:h-full bg-surface-container-low flex flex-col pt-6 md:pt-12 pb-4 md:pb-8 shrink-0 border-b md:border-b-0 md:border-r border-outline-variant/15 relative z-20">
        <div className="px-6 md:px-10 mb-2 md:mb-16 flex items-center justify-between md:block">
          {/* Site Logo */}
          <div className="text-3xl md:text-4xl font-serif tracking-tight font-medium text-primary cursor-pointer hover:opacity-80 transition-opacity">
            Loom & Craft
          </div>
          {/* Mobile Hamburger Placeholder */}
          <button className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
        
        {/* Navigation - Hidden on mobile by default (to be managed by state later) */}
        <nav className="flex-1 px-4 md:px-6 space-y-2 md:space-y-3 hidden md:block">
          {/* Dashboard Items */}
          <a href="#" className="block px-5 py-3.5 rounded-lg bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-colors">
            Browse All
          </a>
          <Link href="/pattern-calculator" className="block px-5 py-3.5 rounded-lg text-on-surface/80 font-medium hover:bg-surface-container transition-colors">
            Pattern Calculator
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full bg-surface relative overflow-y-auto w-full">
        {/* Top-Right Header */}
        <Header />

        {/* Page Content */}
        <div className="pt-10 md:pt-20 px-6 md:px-16 pb-20 w-full max-w-6xl">
          <div className="mb-12 md:mb-16">
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-4 md:mb-6">Explore the craft</div>
            <h1 className="text-4xl md:text-6xl font-serif text-inverse-surface mb-6 md:mb-8 leading-tight tracking-tight">The Digital Loom</h1>
            <p className="text-lg md:text-xl text-on-surface/80 max-w-3xl leading-relaxed font-sans mt-6 md:mt-8 bg-surface-container-low/50 p-6 rounded-xl border border-outline-variant/10">
              Welcome to the tactile digital space. A place where elements are woven together through soft layering, organic depth, and intentional breathing room.
            </p>
          </div>

          <div id="calculator" className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-20 pb-12 border-b border-outline-variant/15">
            {/* Example Card 1 */}
            <div className="bg-surface-container-lowest ambient-shadow rounded-[1.25rem] overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] h-max">
              <div className="h-64 bg-secondary-container transition-colors group-hover:bg-opacity-80"></div>
              <div className="p-10 bg-surface-container-lowest relative pt-12">
                <div className="absolute -top-6 left-10 bg-surface-container-highest px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm backdrop-blur-md">
                  <div className="text-xs font-bold tracking-widest uppercase text-tertiary">Woodcraft</div>
                </div>
                <h3 className="text-3xl font-serif mb-4 text-inverse-surface">Sustainable Shelving</h3>
                <p className="text-on-surface/75 text-lg leading-relaxed">A practical guide to building modular shelves without screws. Using traditional joining methods for modern spaces.</p>
              </div>
            </div>
            
            {/* The Pattern Calculator Card Link */}
            <Link href="/pattern-calculator/teddy-bear" className="block h-max outline-none focus:ring-2 focus:ring-primary rounded-[1.25rem]">
              <div className="bg-surface-container-lowest ambient-shadow rounded-[1.25rem] overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] h-full flex flex-col">
                <div className="h-64 transition-colors relative flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/images/teddy-bear-pattern.png" 
                    alt="Teddy Bear Pattern Preview" 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-10 bg-surface-container-lowest relative pt-12 flex-1">
                  <div className="absolute -top-6 left-10 bg-surface-container-highest px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm backdrop-blur-md">
                    <div className="text-xs font-bold tracking-widest uppercase text-primary">Tool</div>
                  </div>
                  <h3 className="text-3xl font-serif mb-4 text-inverse-surface group-hover:text-primary transition-colors">Teddy Bear Pattern</h3>
                  <p className="text-on-surface/75 text-lg leading-relaxed">Calculate exact fabric yardage and cutting dimensions for a plush bear.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
