import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

const articles = [
  {
    href: '/articles/safety-eyes',
    tag: 'Safety Guide',
    tagColor: 'text-tertiary',
    title: 'How to Secure Safety Eyes (So They Won\'t Fall Off)',
    desc: 'Step-by-step guide to installing safety eyes so they cannot be pulled out. Includes the Pull & Push test and the pliers technique.',
    bg: 'bg-secondary-container',
  },
  {
    href: '/articles/best-fabric',
    tag: 'Materials',
    tagColor: 'text-tertiary',
    title: 'Best Fabric for Soft Toys (5 Top Choices)',
    desc: 'A beginner\'s ranking of the top 5 soft toy fabrics from easiest to hardest, with a guide on nap direction.',
    bg: 'bg-tertiary-container',
  },
  {
    href: '/articles/baby-stuffing',
    tag: 'Safety Guide',
    tagColor: 'text-tertiary',
    title: 'Safest Stuffing for Baby Toys (0–3 Years)',
    desc: 'Learn which stuffing materials are safe for babies, which are dangerous, and the 3 mandatory baby stuffing safety rules.',
    bg: 'bg-primary-container',
  },
  {
    href: '/articles/washing-machine-safe',
    tag: 'Care Guide',
    tagColor: 'text-tertiary',
    title: 'Make Your Plushie Washing-Machine Safe',
    desc: 'How to use short stitches, reinforce stress points, and wash your plushie so it survives every cycle.',
    bg: 'bg-secondary-container',
  },
  {
    href: '/articles/pattern-from-drawing',
    tag: 'Pattern Making',
    tagColor: 'text-tertiary',
    title: 'Making a Pattern from a Drawing (For Beginners)',
    desc: 'Use the Grid Method to scale up your drawing into a sewing pattern — no computer required.',
    bg: 'bg-tertiary-container',
  },
  {
    href: '/articles/plush-fabrics-guide',
    tag: 'Guide',
    tagColor: 'text-tertiary',
    title: 'Beginner\'s Guide to Plush Fabrics',
    desc: 'Fabrics have a grain and stretch. This cheat sheet covers no-stretch, 1-way, and 4-way stretch fabrics with a buying guide.',
    bg: 'bg-primary-container',
  },
  {
    href: '/articles/sewing-curves',
    tag: 'Technique',
    tagColor: 'text-tertiary',
    title: 'Sewing Perfect Curves on Small Soft Toys (No Puckers!)',
    desc: 'Master clipping for inside curves, outside curves, and tight corners to get smooth, professional-looking results.',
    bg: 'bg-secondary-container',
  },
  {
    href: '/pattern-calculator/teddy-bear',
    tag: 'Tool',
    tagColor: 'text-primary',
    title: 'Teddy Bear Pattern Calculator',
    desc: 'Calculate exact fabric yardage and cutting dimensions for a plush bear. Download a printable PDF pattern.',
    image: '/images/teddy-bear-pattern.png',
    bg: 'bg-surface-container',
  },
]

export default function Home() {
  return (
    <>
      {/* Left Sidebar */}
      <aside className="w-full md:w-[340px] h-auto md:h-full bg-surface-container-low flex flex-col pt-6 md:pt-12 pb-4 md:pb-8 shrink-0 border-b md:border-b-0 md:border-r border-outline-variant/15 relative z-20">
        <div className="px-6 md:px-10 mb-2 md:mb-16 flex items-center justify-between md:block">
          <div className="text-3xl md:text-4xl font-serif tracking-tight font-medium text-primary cursor-pointer hover:opacity-80 transition-opacity">
            Loom &amp; Craft
          </div>
          <button className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>

        <nav className="flex-1 px-4 md:px-6 space-y-2 md:space-y-3 hidden md:block">
          <a href="#" className="block px-5 py-3.5 rounded-lg bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-colors">
            Browse All
          </a>
          <Link href="/pattern-calculator" className="block px-5 py-3.5 rounded-lg text-on-surface/80 font-medium hover:bg-surface-container transition-colors">
            Pattern Calculator
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full bg-surface relative overflow-y-auto w-full">
        <Header />

        <div className="pt-10 md:pt-20 px-6 md:px-16 pb-20 w-full max-w-6xl">
          {/* Hero */}
          <div className="mb-12 md:mb-16">
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-4 md:mb-6">Explore the craft</div>
            <h1 className="text-4xl md:text-6xl font-serif text-inverse-surface mb-6 md:mb-8 leading-tight tracking-tight">Loom &amp; Craft</h1>
            <p className="text-lg md:text-xl text-on-surface/80 max-w-3xl leading-relaxed font-sans mt-6 md:mt-8 bg-surface-container-low/50 p-6 rounded-xl border border-outline-variant/10">
              Your digital sanctuary for modern crafting. Discover step-by-step plushie tutorials, interactive pattern calculators, and a community of creators weaving their ideas into reality.
            </p>
          </div>

          {/* Cards grid */}
          <div id="browse-all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 md:mt-20 pb-12">
            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="block h-max outline-none focus:ring-2 focus:ring-primary rounded-[1.25rem]"
              >
                <div className="bg-surface-container-lowest ambient-shadow rounded-[1.25rem] overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] h-full flex flex-col">
                  {/* Image / placeholder area */}
                  <div className={`h-52 relative flex items-center justify-center overflow-hidden ${article.image ? '' : article.bg}`}>
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-on-surface/20 text-xs font-mono tracking-wide">Image coming soon</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 bg-surface-container-lowest relative pt-10 flex-1">
                    <div className="absolute -top-5 left-8 bg-surface-container-highest px-4 py-1.5 rounded-full border border-outline-variant/20 shadow-sm backdrop-blur-md">
                      <div className={`text-[10px] font-bold tracking-widest uppercase ${article.tagColor}`}>{article.tag}</div>
                    </div>
                    <h3 className="text-xl font-serif mb-3 text-inverse-surface group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-on-surface/65 text-[14px] leading-relaxed">{article.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
