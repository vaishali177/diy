import Header from '@/components/Header'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/login/actions'
import AvatarUpload from '@/components/AvatarUpload'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase.from('profiles').select('avatar_url').eq('id', user.id).single()
  
  const { data: lists } = await supabase
    .from('lists')
    .select('*, saved_items(*)')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: true })

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
              <AvatarUpload uid={user.id} url={profile?.avatar_url || null} />
              
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
              <h3 className="text-xl font-serif text-inverse-surface mb-6">Saved Patterns & Projects</h3>
              
              {lists && lists.length > 0 ? (
                <div className="space-y-8">
                  {lists.map((list: any) => (
                    <div key={list.id} className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden shadow-sm">
                      <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant/5 flex justify-between items-center">
                        <h4 className="font-medium text-inverse-surface flex items-center gap-2">
                          {list.name}
                          {list.is_default && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Default</span>}
                        </h4>
                        <span className="text-xs text-on-surface/60 font-mono">{list.saved_items?.length || 0} items</span>
                      </div>
                      
                      <div className="p-6">
                        {!list.saved_items || list.saved_items.length === 0 ? (
                          <p className="text-on-surface/40 text-sm italic">Nothing saved here yet.</p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {list.saved_items.map((item: any) => (
                              <Link href={`/pattern-calculator/${item.reference_id}`} key={item.id} className="block group">
                                <div className="p-4 rounded-lg border border-outline-variant/10 hover:border-primary/40 transition-colors bg-surface-container/30 group-hover:bg-surface-container flex flex-col h-full shadow-sm">
                                  <div className="text-[10px] font-bold tracking-widest uppercase text-tertiary mb-2">{item.item_type}</div>
                                  <div className="font-medium text-inverse-surface capitalize mb-3 text-sm">{item.reference_id.replace('-', ' ')}</div>
                                  {item.metadata && Object.keys(item.metadata).length > 0 && (
                                    <div className="mt-auto pt-3 border-t border-outline-variant/5 text-xs text-on-surface/70 font-mono">
                                      {item.metadata.height && `H:${item.metadata.height}cm `}
                                      {item.metadata.length && `L:${item.metadata.length}cm `}
                                      {item.metadata.seam && `Seam:${item.metadata.seam}cm`}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface-container/50 border border-outline-variant/10 rounded-xl p-8 text-center border-dashed">
                  <p className="text-on-surface/50 text-sm">Your saved craft projects will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
