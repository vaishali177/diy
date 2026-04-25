import Header from '@/components/Header'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/login/actions'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <aside className="w-[340px] h-full bg-surface-container-low flex flex-col pt-12 pb-8 shrink-0 border-r border-outline-variant/15 hidden md:flex relative z-20">
        <div className="px-10 mb-16">
          <Link href="/" className="text-4xl font-serif tracking-tight font-medium text-primary cursor-pointer hover:opacity-80 transition-opacity">
            Loom & Craft
          </Link>
        </div>
        <nav className="flex-1 px-6 space-y-3">
          <Link href="/" className="block px-5 py-3.5 rounded-lg text-on-surface/80 font-medium hover:bg-surface-container transition-colors">
            Browse All
          </Link>
          <Link href="/pattern-calculator" className="block px-5 py-3.5 rounded-lg text-on-surface/80 font-medium hover:bg-surface-container transition-colors">
            Pattern Calculator
          </Link>
        </nav>
      </aside>

      <main className="flex-1 h-full bg-surface relative overflow-y-auto w-full">
        <Header />

        <div className="pt-20 px-16 pb-20 w-full max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="text-sm font-bold tracking-[0.2em] uppercase text-tertiary mb-6">Account</div>
            <h1 className="text-5xl font-serif text-inverse-surface mb-4 leading-tight tracking-tight">Your Profile</h1>
            <p className="text-lg text-on-surface/60 font-sans mt-2">Manage your digital loom identity.</p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-4xl text-on-surface font-serif shadow-inner">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1">
                <div className="text-[11px] font-bold tracking-widest uppercase text-tertiary mb-2">Registered Email</div>
                <div className="text-2xl font-medium text-inverse-surface mb-6">{user.email}</div>
                
                <form action={signOut}>
                  <button className="px-6 py-2.5 rounded-lg border border-outline-variant/30 text-on-surface font-medium hover:bg-surface-container transition-colors shadow-sm text-sm">
                    Log out of this device
                  </button>
                </form>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-outline-variant/10 relative z-10">
              <h3 className="text-xl font-serif text-inverse-surface mb-4">Saved Patterns & Projects</h3>
              <div className="bg-surface-container/50 border border-outline-variant/10 rounded-xl p-8 text-center border-dashed">
                <p className="text-on-surface/50 text-sm">Your saved craft projects will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
