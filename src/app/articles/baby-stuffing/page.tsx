import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Safest Stuffing for Baby Toys (0–3 Years) | Loom & Craft',
  description:
    'If the toy is for a child under 3, these rules are mandatory. Learn which stuffing materials are safe, which are dangerous, and the 3 baby stuffing safety rules.',
}

const safeOptions = [
  {
    name: 'Polyester Fiberfill (Premium)',
    why: 'Synthetic fibers don\'t trap moisture or grow mold. Premium brands test for harmful chemicals.',
    note: 'Look for "non-toxic", "hypoallergenic", and "washable" on the bag.',
  },
  {
    name: 'Organic Cotton Batting',
    why: 'No chemical flame retardants or pesticides. Cotton is breathable and washable.',
    note: 'Expensive but the safest option.',
  },
  {
    name: 'Wool (Clean, carded)',
    why: 'Wool resists dust mites naturally. Must be washed to remove lanolin (which some babies react to).',
    note: 'Natural, but check for allergies first.',
  },
]

const dangerousOptions = [
  {
    name: 'Bean bag pellets (polystyrene beads)',
    why: 'If the seam opens, beads are exactly the size of a baby\'s airway. One bead = choking hazard.',
  },
  {
    name: 'Recycled fabric scraps',
    why: 'They lump up into hard balls and can hide mold or staples from the original garment.',
  },
  {
    name: 'Old pillow stuffing',
    why: 'Pillows collect dust mites, skin oils, and bacteria over years. Not safe for mouthing.',
  },
  {
    name: 'Sand or rice',
    why: 'Moisture from drool turns sand/rice into a bacterial breeding ground within hours. Also heavy enough to injure if thrown.',
  },
]

export default function BabyStuffingArticle() {
  return (
    <>
      <Sidebar />

      <main className="flex-1 h-full bg-surface relative overflow-y-auto w-full">
        <Header />

        <article className="pt-10 md:pt-20 px-6 md:px-16 pb-24 w-full max-w-3xl">
          <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-4">Safety Guide</div>

          <h1 className="text-4xl md:text-5xl font-serif text-inverse-surface mb-6 leading-tight tracking-tight">
            Safest Stuffing for Baby Toys (0–3 Years)
          </h1>

          <p className="text-lg text-on-surface/70 mb-10 leading-relaxed border-l-2 border-primary pl-5">
            If the toy is for a child under 3, these rules are mandatory, not suggestions.
          </p>

          {/* Image placeholder */}

          <div className="relative w-full h-72 rounded-2xl mb-10 overflow-hidden">
            <Image
              src="/images/baby-stuffing-hero.png"
              alt="Safe polyester fiberfill next to a do-not-use icon showing rice, sand, and beads"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>


          {/* Safe */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6 flex items-center gap-3">
            <span className="text-2xl">✅</span> Safe choices
          </h2>
          <div className="space-y-5 mb-12">
            {safeOptions.map(o => (
              <div key={o.name} className="bg-green-900/10 border border-green-700/20 rounded-xl p-5">
                <div className="text-[15px] font-semibold text-inverse-surface mb-1">{o.name}</div>
                <p className="text-[13px] text-on-surface/60 italic mb-2">{o.note}</p>
                <div className="text-[13px] text-tertiary">
                  <span className="font-semibold">Why safe: </span>{o.why}
                </div>
              </div>
            ))}
          </div>

          {/* Dangerous */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6 flex items-center gap-3">
            <span className="text-2xl">🚫</span> Never use for babies
          </h2>
          <div className="space-y-5 mb-12">
            {dangerousOptions.map(o => (
              <div key={o.name} className="bg-red-900/10 border border-red-700/20 rounded-xl p-5">
                <div className="text-[15px] font-semibold text-inverse-surface mb-1">{o.name}</div>
                <div className="text-[13px] text-red-400/80">
                  <span className="font-semibold">Why dangerous: </span>{o.why}
                </div>
              </div>
            ))}
          </div>

          {/* 3 safety rules */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">The 3 Safety Rules for Baby Stuffing</h2>
          <div className="space-y-6">
            {[
              {
                n: '01',
                title: 'Use an Inner Lining',
                body: 'Put the stuffing inside a tight muslin bag before putting it into the toy.',
                why: 'This creates a double barrier. If the outer seam fails, the inner bag still contains the stuffing.',
              },
              {
                n: '02',
                title: 'The Pinch Test',
                body: 'After stuffing, pinch the toy firmly.',
                why: 'Hard lumps mean uneven filling. Lumps create pressure points that can pop seams over time.',
              },
              {
                n: '03',
                title: 'Overstuff slightly',
                body: 'A firm toy is safer than a floppy one.',
                why: 'Firm toys don\'t allow fingers to dig into seams and pull them apart. Floppy toys invite picking.',
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
