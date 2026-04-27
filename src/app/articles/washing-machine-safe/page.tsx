import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Make Your Plushie Washing-Machine Safe | Loom & Craft',
  description:
    'Most soft toys die in the washer. Learn how to use short stitches, double stitch stress points, and the right washing method so your plushie survives every cycle.',
}

export default function WashingMachineSafeArticle() {
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
          <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-4">Care Guide</div>

          <h1 className="text-4xl md:text-5xl font-serif text-inverse-surface mb-6 leading-tight tracking-tight">
            Make Your Plushie Washing-Machine Safe
          </h1>

          <p className="text-lg text-on-surface/70 mb-10 leading-relaxed border-l-2 border-primary pl-5">
            Most soft toys die in the washer. Here's how to make yours survive.
          </p>

          {/* The three enemies */}
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-6 mb-10">
            <div className="text-xs font-bold tracking-widest uppercase text-tertiary mb-3">The Three Enemies</div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {['Tugging (loosens seams)', 'Soaking (weakens thread)', 'Centrifugal force (throws toy against drum)'].map(e => (
                <div key={e} className="bg-surface-container rounded-xl p-4">
                  <div className="text-[13px] text-on-surface/70 leading-snug">{e}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Design stage */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">Before sewing — Design stage</h2>
          <div className="space-y-6 mb-12">
            {[
              {
                title: 'Use short stitches (1.8mm – 2.0mm length)',
                why: 'Standard stitches (2.5mm) are too long. Tugging pulls thread between stitches. Short stitches lock thread in place.',
              },
              {
                title: 'Double stitch all stress points (arms, legs, neck)',
                body: 'Sew forward, then backward over the same line.',
                why: 'Appendages get yanked hardest. Double stitching creates a backup line of defense.',
              },
              {
                title: 'Use interfacing on thin fabrics',
                why: 'Thin cotton tears easily when wet. Interfacing (stiff backing ironed onto fabric) strengthens weak spots.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <div className="text-[15px] font-semibold text-inverse-surface mb-1">{item.title}</div>
                  {item.body && <p className="text-[14px] text-on-surface/75 leading-relaxed mb-2">{item.body}</p>}
                  <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container-low/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50">
                    <span className="font-semibold">Why: </span>{item.why}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Construction */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">The &ldquo;Washing Machine Test&rdquo; construction</h2>
          <div className="space-y-6 mb-12">
            {[
              {
                title: 'No poly pellets inside the body',
                why: 'Pellets break from repeated spinning. Broken pieces escape through seams and become choking hazards.',
              },
              {
                title: 'Close the seam completely',
                body: 'Do NOT leave a small gap. Leave a 4-inch gap for turning, but close it with a ladder stitch that is double-threaded.',
                why: 'Small gaps (1 inch) are impossible to close tightly enough for machine washing. Larger gaps give you room to sew properly.',
              },
              {
                title: 'Reinforce the closing',
                body: 'After finishing your ladder stitch, tie a triple knot. Apply a tiny dab of fabric glue directly onto the knot only (not the thread tails).',
                why: 'Thread absorbs water and weakens. The knot is the weakest point. Sealing just the knot with fabric glue keeps it locked without exposing the toy to excess chemicals. Never use Fray Check or nail polish on baby toys — these contain solvents that aren\'t safe for mouthing.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <div className="text-[15px] font-semibold text-inverse-surface mb-1">{item.title}</div>
                  {item.body && <p className="text-[14px] text-on-surface/75 leading-relaxed mb-2">{item.body}</p>}
                  <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container-low/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50">
                    <span className="font-semibold">Why: </span>{item.why}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-72 rounded-2xl mb-10 overflow-hidden">
            <Image
              src="/images/washing-machine.png"
              alt="Plushie in a laundry bag ready to be machine washed"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          {/* How to wash */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">How to wash — Step-by-step</h2>
          <div className="space-y-6">
            {[
              {
                n: '01',
                title: 'Use a laundry bag or pillowcase',
                body: 'Put plushie in a zippered laundry bag or tied pillowcase.',
                why: 'The bag contains the toy during spin cycle so it doesn\'t smash against the drum repeatedly.',
              },
              {
                n: '02',
                title: 'Add towels to the machine',
                why: 'Towels act as cushions and shock absorbers. They fill empty space so the toy doesn\'t bounce violently.',
              },
              {
                n: '03',
                title: 'Use cold water, delicate cycle',
                why: 'Hot water melts the glue that holds safety eyes together. Heat also shrinks some fabrics unevenly.',
              },
              {
                n: '04',
                title: 'NO spin cycle — or lowest possible spin',
                why: 'High-speed spinning is what breaks seams. The water is gone; you don\'t need spin.',
              },
              {
                n: '05',
                title: 'Air dry only',
                why: 'Dryer heat melts polyester fabric fibers and rusts any internal wire armatures.',
              },
            ].map(step => (
              <div key={step.n} className="flex gap-5">
                <div className="w-9 h-9 rounded-[10px] bg-surface-container flex items-center justify-center text-[11px] text-primary font-bold shrink-0 font-mono shadow-sm border border-outline-variant/20 mt-0.5">
                  {step.n}
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-inverse-surface mb-1">{step.title}</div>
                  {step.body && <p className="text-[14px] text-on-surface/75 leading-relaxed mb-2">{step.body}</p>}
                  <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container-low/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50">
                    <span className="font-semibold">Why: </span>{step.why}
                  </div>
                </div>
              </div>
            ))}
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
