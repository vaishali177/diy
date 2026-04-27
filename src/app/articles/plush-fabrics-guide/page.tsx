import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Beginner's Guide to Plush Fabrics: Your Cheat Sheet | Loom & Craft",
  description:
    "Fabrics have a grain and stretch — understanding these saves you from sewing disasters. A beginner's cheat sheet covering no-stretch, 1-way, and 4-way stretch fabrics with a buying guide.",
}

export default function PlushFabricsGuideArticle() {
  return (
    <>
      <aside className="w-full md:w-[340px] h-auto md:h-full bg-surface-container-low flex flex-col pt-6 md:pt-12 pb-4 md:pb-8 shrink-0 border-b md:border-b-0 md:border-r border-outline-variant/15 relative z-20">
        <div className="px-6 md:px-10 mb-2 md:mb-16">
          <Link href="/" className="text-3xl md:text-4xl font-serif tracking-tight font-medium text-primary hover:opacity-80 transition-opacity">
            Loom &amp; Craft
          </Link>
        </div>
        <nav className="flex-1 px-4 md:px-6 space-y-2 md:space-y-3 hidden md:block">
          <Link href="/" className="block px-5 py-3.5 rounded-lg bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-colors">
            Browse All
          </Link>
          <Link href="/pattern-calculator" className="block px-5 py-3.5 rounded-lg text-on-surface/80 font-medium hover:bg-surface-container transition-colors">
            Pattern Calculator
          </Link>
        </nav>
      </aside>

      <main className="flex-1 h-full bg-surface relative overflow-y-auto w-full">
        <Header />

        <article className="pt-10 md:pt-20 px-6 md:px-16 pb-24 w-full max-w-3xl">
          <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-4">Materials</div>

          <h1 className="text-4xl md:text-5xl font-serif text-inverse-surface mb-6 leading-tight tracking-tight">
            Beginner&apos;s Guide to Plush Fabrics (Your Cheat Sheet)
          </h1>

          <p className="text-lg text-on-surface/70 mb-10 leading-relaxed border-l-2 border-primary pl-5">
            Fabrics have a &ldquo;grain&rdquo; and &ldquo;stretch&rdquo;. Understanding these saves you from sewing disasters.
          </p>

          {/* Image placeholder */}

          <div className="relative w-full h-72 rounded-2xl mb-10 overflow-hidden">
            <Image
              src="/images/plush-fabric.png"
              alt="a basic teel plush fabric "
              fill
              className="object-cover"
              priority
            />
          </div>


          {/* By Stretch */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">By Stretch <span className="text-base font-sans text-on-surface/50">(Most important for beginners)</span></h2>

          <div className="space-y-5 mb-12">
            {[
              {
                type: 'No Stretch (Woven)',
                examples: 'Cotton, linen, felt',
                difficulty: '⭐ Easy',
                why: 'No-stretch fabrics hold their shape as you sew them. Corners stay where you put them. Best for practice.',
                tag: 'bg-green-900/20 text-green-400 border-green-700/30',
              },
              {
                type: '1-Way Stretch',
                examples: 'Fleece, velour',
                difficulty: '⭐⭐ Medium',
                note: 'Stretches left-to-right but not up-down.',
                why: 'You must cut all pieces with stretch going the same direction. If you don\'t, one arm will stretch sideways and the other arm won\'t.',
                tag: 'bg-amber-900/20 text-amber-400 border-amber-700/30',
              },
              {
                type: '4-Way Stretch',
                examples: 'Minky, jersey',
                difficulty: '⭐⭐⭐ Hard',
                note: 'Stretches every direction.',
                why: 'These fabrics squirm under your sewing machine. They can become wavy or twisted if you don\'t use a walking foot. Hard for beginners.',
                tag: 'bg-red-900/20 text-red-400 border-red-700/30',
              },
            ].map(f => (
              <div key={f.type} className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="text-[15px] font-semibold text-inverse-surface">{f.type}</div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${f.tag}`}>{f.difficulty}</span>
                </div>
                <div className="text-[13px] text-on-surface/60 italic mb-1">{f.examples}{f.note ? ` — ${f.note}` : ''}</div>
                <div className="text-[13px] text-tertiary leading-relaxed mt-2 bg-surface-container/80 rounded-lg px-4 py-2 border-l-2 border-tertiary/50">
                  <span className="font-semibold">Why this matters: </span>{f.why}
                </div>
              </div>
            ))}
          </div>

          {/* By Fraying */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">By Fraying <span className="text-base font-sans text-on-surface/50">(How edges behave)</span></h2>

          <div className="space-y-5 mb-12">
            {[
              {
                type: 'Fray a lot',
                examples: 'Cotton, linen',
                why: 'You must zigzag or serge raw edges, or the seam will disappear inside your toy as threads pull out.',
                solution: 'Zigzag stitch or pinking shears.',
              },
              {
                type: 'Fray a little',
                examples: 'Minky, fleece',
                why: 'The synthetic fibers are melted at the factory, so they don\'t unravel easily. You can leave raw edges inside without worry.',
              },
              {
                type: 'No fray at all',
                examples: 'Felt, fleece, synthetic suede',
                why: 'Perfect for no-sew projects or hand sewing. Cut edges act like their own hem.',
              },
            ].map(f => (
              <div key={f.type} className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5">
                <div className="text-[15px] font-semibold text-inverse-surface mb-1">{f.type}</div>
                <div className="text-[13px] text-on-surface/60 italic mb-2">{f.examples}</div>
                <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container/80 rounded-lg px-4 py-2 border-l-2 border-tertiary/50">
                  <span className="font-semibold">Why this matters: </span>{f.why}
                </div>
                {f.solution && (
                  <div className="text-[13px] text-primary mt-2">
                    <span className="font-semibold">Solution: </span>{f.solution}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Buying guide */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">Buying guide for your first project</h2>
          <div className="space-y-4 mb-10">
            {[
              { label: 'Budget', fabric: 'Anti-pill fleece ($8/yard)', why: 'Forgiving, doesn\'t fray, cheap enough for mistakes.' },
              { label: 'Cute & Easy', fabric: 'Cotton with small print ($10/yard)', why: 'Easy to mark, easy to sew, but remember to zigzag edges.' },
              { label: 'Luxury', fabric: 'Minky ($20/yard — buy extra for mistakes)', why: 'Extremely soft but challenging. The extra yard is for practice cuts.' },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-start">
                <span className="text-[11px] font-bold tracking-widest uppercase text-tertiary bg-surface-container-low border border-outline-variant/20 rounded-full px-3 py-1 shrink-0 mt-0.5">{item.label}</span>
                <div>
                  <div className="text-[14px] font-semibold text-inverse-surface">{item.fabric}</div>
                  <div className="text-[13px] text-on-surface/60 leading-relaxed">{item.why}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quality test */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-7">
            <div className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Quick test for fabric quality</div>
            <p className="text-[15px] text-on-surface/80 leading-relaxed">
              Hold the fabric up to light. Can you see through it? If yes, it's too thin for soft toys. Look for fabric that <strong className="text-inverse-surface">blocks light completely</strong>.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-outline-variant/15">
            <Link href="/" className="text-primary font-medium hover:opacity-70 transition-opacity text-[14px]">
              ← Back to Browse All
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}
