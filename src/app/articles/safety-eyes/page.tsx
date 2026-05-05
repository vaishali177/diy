import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'How to Secure Safety Eyes on Soft Toys | Loom & Craft',
  description:
    'Step-by-step guide to installing safety eyes so they cannot be pulled out. Includes the Pull & Push test and pliers technique.',
}

export default function SafetyEyesArticle() {
  return (
    <>
      <Sidebar />

      <main className="flex-1 h-full bg-surface relative overflow-y-auto w-full">
        <Header />

        <article className="pt-10 md:pt-20 px-6 md:px-16 pb-24 w-full max-w-3xl">
          {/* Eyebrow */}
          <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-4">Safety Guide</div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif text-inverse-surface mb-6 leading-tight tracking-tight">
            How to Secure Safety Eyes (So They Won't Fall Off)
          </h1>

          <p className="text-lg text-on-surface/70 mb-10 leading-relaxed border-l-2 border-primary pl-5">
            Safety eyes are a top choking hazard if not installed correctly. Follow these rules strictly.
          </p>

          {/* Materials */}
          <div className="bg-surface-container-low rounded-xl p-6 mb-10 border border-outline-variant/20">
            <div className="text-xs font-bold tracking-widest uppercase text-tertiary mb-3">What you need</div>
            <ul className="text-on-surface/80 space-y-1 text-[15px]">
              <li>Safety eyes (with washers)</li>
              <li>Pliers</li>
            </ul>
          </div>

          {/* Image placeholder */}

          <div className="relative w-full h-72 rounded-2xl mb-10 overflow-hidden">
            <Image
              src="/images/saftey-eye.png"
              alt="Safety eyes with a black plastic washer for securing them in a soft toy"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Steps */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">Step-by-step security check</h2>

          <div className="space-y-8">
            {[
              {
                n: '01',
                title: 'Mark your spot first',
                body: 'Before cutting any hole, mark the fabric where you want the eyes using chalk or disappearing ink pen.',
                why: 'If you cut first, you can\'t fix a misplaced hole. Marking lets you check symmetry.',
              },
              {
                n: '02',
                title: 'Cut a tiny slit',
                body: 'Use small, sharp scissors (like nail scissors). Cut a slit smaller than the stem of the safety eye.',
                why: 'A tight fit means the washer has something to grip. A loose hole lets the eye pull through.',
              },
              {
                n: '03',
                title: 'Insert from the front',
                body: 'Push the eye stem through the slit from the right side of the fabric.',
                why: 'The flat front of the eye should sit against the outside of your toy. Reversing this looks wrong and weakens hold.',
              },
              {
                n: '04',
                title: 'Apply the washer',
                body: 'On the wrong side (inside of the toy), push the metal or plastic washer onto the stem until it clicks flush against the fabric.',
                why: 'The washer must touch fabric, not air. Any gap means the eye can wobble loose.',
              },
            ].map(step => (
              <div key={step.n} className="flex gap-5">
                <div className="w-9 h-9 rounded-[10px] bg-surface-container flex items-center justify-center text-[11px] text-primary font-bold shrink-0 font-mono shadow-sm border border-outline-variant/20 mt-0.5">
                  {step.n}
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-inverse-surface mb-1">{step.title}</div>
                  <p className="text-[14px] text-on-surface/75 leading-relaxed mb-2">{step.body}</p>
                  <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container-low/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50">
                    <span className="font-semibold">Why: </span>{step.why}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pull & Push Test */}
          <div className="my-12 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-7">
            <h3 className="text-xl font-serif text-inverse-surface mb-5">The &ldquo;Pull &amp; Push&rdquo; Test</h3>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-primary text-[14px]">Pull: </span>
                <span className="text-[14px] text-on-surface/75">Try to pull the eye out from the front. If it moves, it's not secure.</span>
              </div>
              <div>
                <span className="font-semibold text-primary text-[14px]">Push: </span>
                <span className="text-[14px] text-on-surface/75">Push the back of the washer hard against the fabric. You should hear a solid &ldquo;click&rdquo;.</span>
              </div>
              <div className="text-[13px] text-tertiary bg-surface-container/80 rounded-lg px-4 py-2 border-l-2 border-tertiary/50 mt-2">
                <span className="font-semibold">Why: </span>Audible clicks confirm the washer locked into the stem's groove. No click = no lock. Hand pressure is often too weak to achieve this.
              </div>
            </div>
          </div>

          {/* Image placeholder 2 */}
          <div className="w-full h-72 bg-surface-container rounded-2xl mb-10 flex items-center justify-center border border-dashed border-outline-variant/40">
            <span className="text-on-surface/30 text-sm font-mono tracking-wide">Image placeholder — Pic 2</span>
          </div>

          {/* Pro tip */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-7 mb-10">
            <div className="text-xs font-bold tracking-widest uppercase text-primary mb-3">The Professional Secret</div>
            <p className="text-[15px] text-on-surface/80 leading-relaxed mb-3">
              Use pliers to squeeze the washer and stem together.
            </p>
            <div className="text-[13px] text-tertiary leading-relaxed">
              <span className="font-semibold">Why: </span>Pliers give you mechanical advantage for a permanent crimp. You will hear and feel the click much more distinctly than with fingers alone.
            </div>
          </div>

          {/* Final check */}
          <div className="flex gap-5">
            <div className="w-9 h-9 rounded-[10px] bg-surface-container flex items-center justify-center text-[11px] text-primary font-bold shrink-0 font-mono shadow-sm border border-outline-variant/20 mt-0.5">
              05
            </div>
            <div>
              <div className="text-[15px] font-semibold text-inverse-surface mb-1">Double-check before stuffing</div>
              <p className="text-[14px] text-on-surface/75 leading-relaxed mb-2">Once secure, you should not be able to spin the eye on its axis.</p>
              <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container-low/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50">
                <span className="font-semibold">Why: </span>Spinning means the hole is too large. Stuffing pressure will eventually push it through.
              </div>
            </div>
          </div>

          {/* Back link */}
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
