import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Sewing Perfect Curves on Small Soft Toys (No Puckers!) | Loom & Craft',
  description:
    'Curves are tricky because the inside edge is shorter than the outside edge. Learn the clipping technique for inside curves, outside curves, and tight corners to get smooth, professional results.',
}

export default function SewingCurvesArticle() {
  return (
    <>
      <Sidebar />

      <main className="flex-1 h-full bg-surface relative overflow-y-auto w-full">
        <Header />

        <article className="pt-10 md:pt-20 px-6 md:px-16 pb-24 w-full max-w-3xl">
          <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-4">Technique</div>

          <h1 className="text-4xl md:text-5xl font-serif text-inverse-surface mb-6 leading-tight tracking-tight">
            Sewing Perfect Curves on Small Soft Toys (No Puckers!)
          </h1>


          <p className="text-lg text-on-surface/70 mb-10 leading-relaxed border-l-2 border-primary pl-5">
            Curves are tricky because the inside edge is shorter than the outside edge. The trick is clipping.
          </p>

          {/* The problem */}
          <div className="bg-red-900/10 border border-red-700/20 rounded-xl p-6 mb-10">
            <div className="text-xs font-bold tracking-widest uppercase text-red-400 mb-2">The Problem</div>
            <p className="text-[14px] text-on-surface/80 leading-relaxed mb-3">
              When you sew a curve and turn it right-side out, it bunches up (puckers) or tears.
            </p>
            <div className="text-[13px] text-on-surface/60 leading-relaxed">
              <span className="font-semibold text-on-surface/80">Why this happens: </span>Imagine a curved road. The inside lane is shorter than the outside lane. Your fabric is the same. The inner curve (shorter side) has extra fabric that has nowhere to go when you flip it. That extra fabric becomes puckers.
            </div>
          </div>

          <div className="bg-green-900/10 border border-green-700/20 rounded-xl p-6 mb-10">
            <div className="text-xs font-bold tracking-widest uppercase text-green-400 mb-2">The Fix</div>
            <p className="text-[14px] text-on-surface/80 leading-relaxed">
              Clip the seam allowance <strong className="text-inverse-surface">before turning</strong>. Clipping removes the extra fabric.
            </p>
          </div>

          {/* Steps */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">Step-by-step for smooth curves</h2>

          {/* Image placeholder */}
          <div className="relative w-full h-72 rounded-2xl mb-10 overflow-hidden">
            <Image
              src="/images/sewing-curve.png"
              alt="A fabric curve with clipped seam allowance ready to be turned right-side out."
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6 mb-12">
            {[
              {
                n: '01',
                title: 'Sew your curve with a small stitch length (1.5mm)',
                why: 'Tight stitches make the fabric more flexible and less likely to pull apart when you clip.',
              },
              {
                n: '02',
                title: 'Do not backstitch at the start of a curve',
                body: 'Sew straight through.',
                why: 'Backstitching creates a clump of thread that gets in the way when you clip close to the seam.',
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

          {/* Three curve types */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">The three curve types</h2>

          <div className="space-y-6 mb-12">
            {[
              {
                title: 'Inside Curve',
                example: '(like a thumb or ear dip)',
                color: 'border-blue-500/50 bg-blue-900/10',
                labelColor: 'text-blue-400',
                steps: [
                  'Take your scissors and cut small V-shapes into the seam allowance.',
                  'Cut almost to the stitch line but not through it.',
                ],
                why: 'V-shapes remove wedges of fabric. When you flip the curve, the two sides of each V pull apart and lay flat instead of bunching.',
              },
              {
                title: 'Outside Curve',
                example: '(like a round head or belly)',
                color: 'border-amber-500/50 bg-amber-900/10',
                labelColor: 'text-amber-400',
                steps: [
                  'Cut small straight notches into the seam allowance.',
                  'Space them every 1/4 inch.',
                ],
                why: 'Straight notches remove tiny rectangles of fabric. On an outside curve, the problem is too much length. Notches remove that length.',
              },
              {
                title: 'Tight Corner',
                example: '(like a tail)',
                color: 'border-purple-500/50 bg-purple-900/10',
                labelColor: 'text-purple-400',
                steps: [
                  'Cut a single straight slit right up to the stitch line at the apex of the corner.',
                ],
                why: 'A tight corner is both an inside and outside curve meeting. A single slit releases tension at the peak.',
              },
            ].map(curve => (
              <div key={curve.title} className={`border rounded-xl p-6 ${curve.color}`}>
                <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${curve.labelColor}`}>
                  {curve.title}
                </div>
                <div className="text-[13px] text-on-surface/50 italic mb-4">{curve.example}</div>
                <div className="space-y-2 mb-4">
                  {curve.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-4 h-4 rounded-full bg-surface-container flex items-center justify-center text-[9px] text-on-surface/60 font-bold shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-[14px] text-on-surface/75 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50">
                  <span className="font-semibold">Why: </span>{curve.why}
                </div>
              </div>
            ))}
          </div>

          {/* Pro trick */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-7 mb-10">
            <div className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Pro Trick</div>
            <p className="text-[15px] text-on-surface/80 leading-relaxed mb-3">
              Use <strong className="text-inverse-surface">pinking shears</strong> (zigzag scissors) to cut the whole curve.
            </p>
            <div className="text-[13px] text-tertiary">
              <span className="font-semibold">Why: </span>Pinking shears cut a zigzag line. That zigzag acts like hundreds of tiny V-cuts all at once. One cut = fully clipped curve.
            </div>
          </div>

          {/* Test */}
          <div className="bg-surface-container border border-outline-variant/20 rounded-xl p-6">
            <div className="text-xs font-bold tracking-widest uppercase text-tertiary mb-2">Test Your Skills</div>
            <p className="text-[14px] text-on-surface/75 leading-relaxed">
              Sew a 4-inch wide circle, clip it, turn it. It should lie flat like a pancake with zero bumps.
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
