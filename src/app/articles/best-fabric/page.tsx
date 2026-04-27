import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Best Fabric for Soft Toys: 5 Top Choices | Loom & Craft',
  description:
    'Not every fabric is cuddly. A beginner\'s ranking of the top 5 soft toy fabrics from easiest to hardest, including cotton, minky, fleece, sherpa, and felt.',
}

const fabrics = [
  {
    rank: '1',
    name: 'Cotton Blends',
    bestFor: 'Small, decorative toys',
    why: 'Doesn\'t stretch, easy to cut, cheap',
    nap: 'No nap (easy)',
    difficulty: '⭐ Easy',
  },
  {
    rank: '2',
    name: 'Minky',
    bestFor: 'Super soft, modern plushies',
    why: 'Very soft, hides seams well',
    nap: 'YES – pay attention!',
    difficulty: '⭐⭐⭐ Medium',
  },
  {
    rank: '3',
    name: 'Fleece',
    bestFor: 'Baby toys, winter animals',
    why: 'No fraying edges, very forgiving',
    nap: 'Minimal (safe to ignore)',
    difficulty: '⭐ Easy',
  },
  {
    rank: '4',
    name: 'Sherpa',
    bestFor: 'Sheep or fluffy bellies',
    why: 'Soft like wool, but messy to cut',
    nap: 'YES – critical!',
    difficulty: '⭐⭐ Medium',
  },
  {
    rank: '5',
    name: 'Felt',
    bestFor: 'Small details (eyes, noses)',
    why: 'Stiff, doesn\'t stretch',
    nap: 'No nap',
    difficulty: '⭐ Easy',
  },
]

export default function FabricChoicesArticle() {
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
            Best Fabric for Soft Toys (5 Top Choices)
          </h1>

          <p className="text-lg text-on-surface/70 mb-10 leading-relaxed border-l-2 border-primary pl-5">
            Not every fabric is cuddly. Here is the beginner's ranking from easiest to hardest.
          </p>

          {/* Nap note */}
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-6 mb-10">
            <div className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">Important Note on Fabric "Nap"</div>
            <p className="text-[14px] text-on-surface/80 leading-relaxed">
              Minky, sherpa, and velvet have a nap. This means the fabric feels smooth when you stroke it one way and rough the other. Always cut all pattern pieces with the nap running in the <strong className="text-inverse-surface">same direction</strong> (usually top-to-bottom of your toy). If you don't, different body parts will look like different colors and textures under light.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-72 rounded-2xl mb-10 overflow-hidden">
            <Image
              src="/images/best-fabric-swatches.png"
              alt="Five small fabric swatches arranged in a neat row"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>


          {/* Table */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-6">Fabric comparison</h2>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-left border-collapse text-[13px] min-w-[560px]">
              <thead>
                <tr className="border-b border-outline-variant/15">
                  {['#', 'Fabric', 'Best For', 'Why Beginners Love It', 'Nap?', 'Difficulty'].map(h => (
                    <th key={h} className="pb-3 pr-4 text-on-surface/50 text-[11px] font-semibold uppercase tracking-[0.08em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fabrics.map(f => (
                  <tr key={f.rank} className="border-b border-outline-variant/8 hover:bg-surface-container/40 transition-colors">
                    <td className="py-4 pr-4 font-mono text-primary font-bold">{f.rank}</td>
                    <td className="py-4 pr-4 font-semibold text-inverse-surface">{f.name}</td>
                    <td className="py-4 pr-4 text-on-surface/70">{f.bestFor}</td>
                    <td className="py-4 pr-4 text-on-surface/70">{f.why}</td>
                    <td className="py-4 pr-4">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${f.nap.startsWith('YES') ? 'bg-red-500/15 text-red-400' : 'bg-surface-container text-on-surface/60'}`}>
                        {f.nap}
                      </span>
                    </td>
                    <td className="py-4 text-on-surface/70">{f.difficulty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to check nap */}
          <h2 className="text-2xl font-serif text-inverse-surface mb-5">How to check nap direction</h2>
          <div className="space-y-4 mb-10">
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-[14px] text-on-surface/75 leading-relaxed">Run your hand across the fabric. The smooth direction = <strong className="text-inverse-surface">with the nap</strong>. The rough direction = against the nap.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-[14px] text-on-surface/75 leading-relaxed">Draw arrows on the paper backing of your fabric to remind yourself.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-[14px] text-on-surface/75 leading-relaxed">If one arm piece has nap pointing up and the other pointing down, one arm will look darker/shiny and the other lighter/matte — the toy will look mismatched in daylight.</p>
            </div>
          </div>

          {/* Verdict */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-7">
            <div className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Beginner Verdict</div>
            <p className="text-[15px] text-on-surface/80 leading-relaxed">
              Start with <strong className="text-inverse-surface">Anti-Pill Fleece</strong>. It has almost no nap (so no direction worries), doesn't fray, and is very cheap.
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
