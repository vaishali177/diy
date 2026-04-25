import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import ProfileMenu from './ProfileMenu'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let avatarUrl = null
  if (user) {
    const { data } = await supabase.from('profiles').select('avatar_url').eq('id', user.id).single()
    if (data) avatarUrl = data.avatar_url
  }

  return (
    <header className="sticky top-0 right-0 left-0 h-[104px] glass-header px-16 flex items-center justify-end z-10 w-full rounded-b-xl">
      <div className="flex items-center gap-8">
        <button className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container hover:bg-surface-container-high transition-transform hover:scale-105 active:scale-95 text-on-surface" aria-label="Toggle Night Mode">
          {/* Moon Icon Placeholder */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
        </button>
        
        {user ? (
          <ProfileMenu userEmail={user.email || ''} avatarUrl={avatarUrl} />
        ) : (
          <Link href="/login" className="px-8 py-3.5 rounded-md primary-gradient-bg text-[#fef8f3] font-medium shadow-[0_8px_20px_rgba(117,88,78,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all tracking-wide block">
            Log in
          </Link>
        )}
      </div>
    </header>
  )
}
