import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Making a Pattern from a Drawing (For Beginners) | Loom & Craft',
  description:
    'You don\'t need a computer. Learn how to use the Grid Method to scale up your drawing into a sewing pattern, add seam allowance, and build a muslin prototype.',
}

export default function PatternFromDrawingArticle() {
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
          <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-4">Pattern Making</div>

          <h1 className="text-4xl md:text-5xl font-serif text-inverse-surface mb-6 leading-tight tracking-tight">
            Making a Pattern from a Drawing (For Beginners)
          </h1>

          <p className="text-lg text-on-surface/70 mb-10 leading-relaxed border-l-2 border-primary pl-5">
            You don't need a computer. You need tracing paper, a pencil, and an eraser.
          </p>

          {/* Step 1 */}
          <div className="flex gap-5 mb-10">
            <div className="w-9 h-9 rounded-[10px] bg-surface-container flex items-center justify-center text-[11px] text-primary font-bold shrink-0 font-mono shadow-sm border border-outline-variant/20 mt-0.5">
              01
            </div>
            <div>
              <h2 className="text-xl font-serif text-inverse-surface mb-3">Simplify your drawing</h2>
              <p className="text-[14px] text-on-surface/75 leading-relaxed mb-3">
                Look at your drawing. Break it into shapes: Head = circle, Ear = oval, Arm = rectangle.
              </p>
              <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container-low/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50 mb-3">
                <span className="font-semibold">Why: </span>Your drawing has details (fingers, toes, expression) that are impossible to sew as patterns. Sewing patterns can only be made from simple, smooth shapes.
              </div>
              <p className="text-[14px] text-on-surface/75 leading-relaxed">
                Redraw the toy using only 4–5 simple geometric shapes.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-5 mb-10">
            <div className="w-9 h-9 rounded-[10px] bg-surface-container flex items-center justify-center text-[11px] text-primary font-bold shrink-0 font-mono shadow-sm border border-outline-variant/20 mt-0.5">
              02
            </div>
            <div>
              <h2 className="text-xl font-serif text-inverse-surface mb-3">The Grid Method</h2>

              <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5 mb-4">
                <div className="text-xs font-bold tracking-widest uppercase text-tertiary mb-2">How the grid works</div>
                <p className="text-[13px] text-on-surface/70 leading-relaxed">
                  Draw a checkerboard of squares over your small drawing. Then draw a larger checkerboard on a new paper. Square-by-square, copy whatever lines appear in each small square into the matching large square. This scales up your drawing perfectly without a photocopier.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Draw a 1-inch grid over your simplified drawing. Use a ruler. Make light pencil lines.',
                  'On a new paper, draw a 2-inch grid (to scale up to double size).',
                  'Copy square by square: Look at the top-left small square. Draw whatever lines you see there into the top-left large square. Move to the next square. Repeat until all squares are copied.',
                ].map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-[14px] text-on-surface/75 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-[13px] text-tertiary leading-relaxed bg-surface-container-low/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50">
                <span className="font-semibold">Why the grid method works: </span>Your eye cannot scale a drawing freehand. The grid breaks the drawing into tiny pieces. Each piece is simple enough to copy accurately. When you finish all pieces, they automatically reconnect into a perfectly scaled drawing.
              </div>

              <div className="mt-4 bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3">
                <span className="text-[13px] font-semibold text-inverse-surface">What if you get stuck on a square? </span>
                <span className="text-[13px] text-on-surface/70">Look only at the lines that touch the edges of that square. Draw those first. The inside lines will make sense after.</span>
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="w-full h-72 bg-surface-container rounded-2xl mb-10 flex items-center justify-center border border-dashed border-outline-variant/40">
            <span className="text-on-surface/30 text-sm font-mono tracking-wide">Image placeholder — Original → Gridded → Pattern (with labels)</span>
          </div>

          {/* Step 3 */}
          <div className="flex gap-5 mb-10">
            <div className="w-9 h-9 rounded-[10px] bg-surface-container flex items-center justify-center text-[11px] text-primary font-bold shrink-0 font-mono shadow-sm border border-outline-variant/20 mt-0.5">
              03
            </div>
            <div>
              <h2 className="text-xl font-serif text-inverse-surface mb-3">Add seam allowance — The #1 beginner mistake</h2>
              <p className="text-[14px] text-on-surface/75 leading-relaxed mb-3">
                After you cut out your shape from the grid paper, add 0.5 inches (1.5 cm) all the way around.
              </p>
              <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container-low/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50 mb-3">
                <span className="font-semibold">Why: </span>When you sew two pieces together, you lose about 0.5 inches to the stitch itself. Without seam allowance, your finished toy will be 1 inch smaller than your drawing.
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 font-mono text-[13px] text-primary">
                Mark it clearly: SEAM ALLOWANCE 0.5&quot;
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-5 mb-10">
            <div className="w-9 h-9 rounded-[10px] bg-surface-container flex items-center justify-center text-[11px] text-primary font-bold shrink-0 font-mono shadow-sm border border-outline-variant/20 mt-0.5">
              04
            </div>
            <div>
              <h2 className="text-xl font-serif text-inverse-surface mb-3">Make a prototype (Muslin)</h2>
              <p className="text-[14px] text-on-surface/75 leading-relaxed mb-3">
                Cut cheap fabric (old bedsheet) using your pattern. Sew it by hand or machine.
              </p>
              <div className="text-[13px] text-tertiary leading-relaxed bg-surface-container-low/60 rounded-lg px-4 py-2 border-l-2 border-tertiary/50 mb-3">
                <span className="font-semibold">Why: </span>Paper lies. Fabric tells the truth. The prototype will reveal all your pattern mistakes before you cut expensive minky.
              </div>
              <p className="text-[14px] text-on-surface/75 leading-relaxed mb-4">
                See where the prototype is too tight or too loose. Adjust your paper pattern. Then make a second prototype.
              </p>

              <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5">
                <div className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">The Golden Rule</div>
                <p className="text-[14px] text-on-surface/80 leading-relaxed mb-2">
                  <strong className="text-inverse-surface">Your first pattern will be wrong. That's normal.</strong> Plan to make 3 prototypes.
                </p>
                <div className="text-[13px] text-tertiary">
                  <span className="font-semibold">Why: </span>Professional plushie makers make 5–10 prototypes per design. Expecting perfection on the first try is unrealistic and leads to frustration.
                </div>
              </div>
            </div>
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
