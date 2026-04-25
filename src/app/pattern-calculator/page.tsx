import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

export default function PatternCalculatorCatalog() {
  return (
    <>
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
          <div className="block px-5 py-3.5 rounded-lg bg-surface-container text-on-surface font-semibold">
            Pattern Calculator
          </div>
        </nav>
      </aside>

      <main className="flex-1 h-full bg-surface relative overflow-y-auto w-full">
        <Header />

        <div className="pt-20 px-16 pb-20 w-full max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-6">Tools</div>
            <h1 className="text-6xl font-serif text-inverse-surface mb-8 leading-tight tracking-tight">Pattern Calculators</h1>
            <p className="text-xl text-on-surface/80 max-w-3xl leading-relaxed font-sans mt-8 bg-surface-container-low/50 p-6 rounded-xl border border-outline-variant/10">
              Select a pattern style below to calculate exact fabric yardage and cutting dimensions for your specific plush project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 pb-12">
            
            {/* Teddy Bear Calculator Card */}
            <Link href="/pattern-calculator/teddy-bear" className="block outline-none focus:ring-2 focus:ring-primary rounded-[1.25rem]">
              <div className="bg-[#0f1a17] ambient-shadow rounded-[1.25rem] overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col border border-outline-variant/10">
                <div className="h-[220px] transition-colors relative flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/images/teddy-bear-pattern.png" 
                    alt="Teddy Bear Pattern Preview" 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-3.5 left-8 shadow-sm backdrop-blur-md rounded-[1.2rem] px-5 py-1.5 z-10" style={{ background: 'linear-gradient(to bottom, #e1ebe8, #c1cdca)' }}>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#8b6355]">Tool</div>
                  </div>
                </div>
                <div className="p-8 pt-12 flex-1">
                  <h3 className="text-3xl font-serif mb-4 text-[#f0ebe3] group-hover:text-[#d07023] transition-colors">Teddy Bear Pattern</h3>
                  <p className="text-[#d6e3df] text-[15px] opacity-80 leading-relaxed">Calculate exact fabric yardage and cutting dimensions for a plush bear.</p>
                </div>
              </div>
            </Link>

            {/* Bunny Plushie Calculator Card */}
            <Link href="/pattern-calculator/bunny" className="block outline-none focus:ring-2 focus:ring-primary rounded-[1.25rem]">
              <div className="bg-[#1a1512] ambient-shadow rounded-[1.25rem] overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col border border-outline-variant/10">
                <div className="h-[220px] transition-colors relative flex items-center justify-center overflow-hidden bg-secondary-container">
                  <Image 
                    src="/images/bunny-pattern.png" 
                    alt="Bunny Plushie Pattern Preview" 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-3.5 left-8 shadow-sm backdrop-blur-md rounded-[1.2rem] px-5 py-1.5 z-10" style={{ background: 'linear-gradient(to bottom, #e1ebe8, #c1cdca)' }}>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#8b6355]">Tool</div>
                  </div>
                </div>
                <div className="p-8 pt-12 flex-1">
                  <h3 className="text-3xl font-serif mb-4 text-[#f0ebe3] group-hover:text-[#d07023] transition-colors">Bunny Plushie</h3>
                  <p className="text-[#d6e3df] text-[15px] opacity-80 leading-relaxed">Adjust ear length and body proportions to calculate your custom bunny plushie materials.</p>
                </div>
              </div>
            </Link>

            {/* Fish Plushie Calculator Card */}
            <Link href="/pattern-calculator/fish" className="block outline-none focus:ring-2 focus:ring-primary rounded-[1.25rem]">
              <div className="bg-[#12181a] ambient-shadow rounded-[1.25rem] overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col border border-outline-variant/10">
                <div className="h-[220px] transition-colors relative flex items-center justify-center overflow-hidden bg-tertiary-container">
                  <Image 
                    src="/images/fish-pattern.png" 
                    alt="Fish Plushie Pattern Preview" 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-3.5 left-8 shadow-sm backdrop-blur-md rounded-[1.2rem] px-5 py-1.5 z-10" style={{ background: 'linear-gradient(to bottom, #e1ebe8, #c1cdca)' }}>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#8b6355]">Tool</div>
                  </div>
                </div>
                <div className="p-8 pt-12 flex-1">
                  <h3 className="text-3xl font-serif mb-4 text-[#f0ebe3] group-hover:text-[#d07023] transition-colors">Fish Plushie</h3>
                  <p className="text-[#d6e3df] text-[15px] opacity-80 leading-relaxed">A simpler pattern perfect for beginners. Calculate measurements for a streamlined aquatic plush.</p>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </main>
    </>
  )
}
