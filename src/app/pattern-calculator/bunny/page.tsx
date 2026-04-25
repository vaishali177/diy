import Header from '@/components/Header'
import Link from 'next/link'
import BunnyCalculator from '@/components/calculators/BunnyCalculator'

export default function BunnyPage() {
  return (
    <>
      {/* Left Sidebar Dashboard */}
      <aside className="w-[340px] h-full bg-surface-container-low flex flex-col pt-12 pb-8 shrink-0 border-r border-outline-variant/15 hidden md:flex">
        <div className="px-10 mb-16">
          <Link href="/" className="text-4xl font-serif tracking-tight font-medium text-primary cursor-pointer hover:opacity-80 transition-opacity">
            Loom & Craft
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-3">
          <Link href="/" className="block px-5 py-3.5 rounded-lg text-on-surface/80 font-medium hover:bg-surface-container transition-colors">
            Browse All
          </Link>
          <Link href="/pattern-calculator" className="block px-5 py-3.5 rounded-lg bg-surface-container text-on-surface font-semibold">
            Pattern Calculator
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full bg-surface relative overflow-y-auto w-full">
        {/* Top-Right Header */}
        <Header />

        {/* Page Content */}
        <div className="pt-20 px-16 pb-20 w-full max-w-5xl mx-auto">
          <Link href="/pattern-calculator" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-tertiary mb-10 hover:text-primary transition-colors">
            <span>←</span> Back to Calculators
          </Link>

          <BunnyCalculator />
        </div>
      </main>
    </>
  )
}
