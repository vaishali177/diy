import Header from '@/components/Header'
import Link from 'next/link'
import BunnyCalculator from '@/components/calculators/BunnyCalculator'
import Sidebar from '@/components/Sidebar'

export default function BunnyPage() {
  return (
    <>
      {/* Left Sidebar Dashboard */}
      <Sidebar />

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
