import { login, signup, signInWithGoogle } from './actions'
import Link from 'next/link'

export default async function LoginPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams
  const errorMessage = searchParams?.error
  const nextPath = typeof searchParams?.next === 'string' ? searchParams.next : '/'

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-[#1e2d34]">
      
      {/* Left Side: Branding / Atmospheric Panel */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-[#2a3d35] p-12 lg:p-16 relative overflow-hidden text-[#d6e3df]">
        {/* Subtle dotted pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #d6e3df 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        {/* Header */}
        <div className="relative z-10">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#d07023] mb-4">The Craft Sanctuary</div>
          <div className="text-5xl font-serif tracking-tight font-medium">Loom&Craft</div>
          <div className="w-12 h-0.5 bg-[#d6e3df]/30 mt-8"></div>
        </div>
        
        {/* Middle Feature List (Option C) */}
        <div className="relative z-10 my-10 flex flex-col gap-6 pl-2">
          <div className="flex items-center gap-4">
            <span className="text-[#d07023] text-xl">✦</span>
            <span className="text-lg font-light tracking-wide text-[#d6e3df]/90">Free step-by-step tutorials</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#d07023] text-xl">✦</span>
            <span className="text-lg font-light tracking-wide text-[#d6e3df]/90">Pattern calculator for soft toys</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#d07023] text-xl">✦</span>
            <span className="text-lg font-light tracking-wide text-[#d6e3df]/90">Save your projects and calculations</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#d07023] text-xl">✦</span>
            <span className="text-lg font-light tracking-wide text-[#d6e3df]/90">Share your own tutorials</span>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="relative z-10">
          <p className="text-2xl font-serif italic leading-snug text-[#d6e3df]/80">
            "Where every thread finds its place and every creator finds their home."
          </p>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#d6e3df]/40 mt-12">
            EST. 2024
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-between relative bg-[#12201f]">
        <div></div> {/* Spacer for flex-between */}

        <form className="w-full max-w-md mx-auto flex flex-col">
          <h2 className="text-4xl font-serif text-[#d6e3df] mb-2">Welcome Back</h2>
          <p className="text-sm text-[#d6e3df]/60 mb-10">Return to your digital loom and continue creating.</p>
          
          {errorMessage && (
            <div className="bg-red-500/10 border-l-4 border-red-500 text-red-200 p-4 rounded text-sm mb-8 shadow-sm">
              {errorMessage}
            </div>
          )}

          <input type="hidden" name="next" value={nextPath} />

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-[#d6e3df]/80">Email Address</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="p-3.5 bg-transparent border border-[#d6e3df]/30 rounded text-[#d6e3df] outline-none focus:border-[#d07023] transition-colors" 
            />
          </div>
          
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex justify-between items-end">
              <label htmlFor="password" className="text-xs font-bold tracking-widest uppercase text-[#d6e3df]/80">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-[#d07023] hover:brightness-125 transition-colors tracking-wide">
                FORGOT PASSWORD?
              </Link>
            </div>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="p-3.5 bg-transparent border border-[#d6e3df]/30 rounded text-[#d6e3df] outline-none focus:border-[#d07023] transition-colors"
              autoComplete="current-password"
            />
          </div>
          
          <button formAction={login} className="w-full bg-[#d07023] hover:bg-[#b85e1a] text-[#1e2d34] py-4 rounded font-bold transition-all shadow-lg tracking-wider active:translate-y-px cursor-pointer">
            LOG IN
          </button>

          <div className="relative flex items-center py-8">
            <div className="flex-grow border-t border-[#d6e3df]/10"></div>
            <span className="flex-shrink-0 mx-4 text-[#d6e3df]/40 text-xs font-bold tracking-widest uppercase">Or</span>
            <div className="flex-grow border-t border-[#d6e3df]/10"></div>
          </div>

          <button formNoValidate formAction={signInWithGoogle} className="w-full bg-transparent border border-[#d6e3df]/30 text-[#d6e3df] hover:bg-[#d6e3df]/5 py-4 rounded font-bold text-xs tracking-widest uppercase transition-colors flex justify-center items-center gap-3 active:translate-y-px cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/><path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/><path d="M5.50253 14.3003C5.00023 12.8099 5.00023 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04"/><path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <div className="mt-8 text-center text-sm text-[#d6e3df]/60">
            New to the sanctuary?{" "}
            <button formAction={signup} className="font-bold text-[#d07023] hover:brightness-125 transition-colors underline decoration-2 underline-offset-4 cursor-pointer">
              Sign up
            </button>
          </div>
        </form>

        {/* Footer inside right panel to ensure clean alignment */}
        <div className="w-full max-w-md mx-auto flex justify-between items-center mt-12 text-xs font-bold tracking-widest text-[#d6e3df]/30 uppercase">
          <Link href="#" className="hover:text-[#d07023] transition-colors">Terms</Link>
          <div className="hidden md:block normal-case font-normal tracking-normal text-[0.65rem]">© 2024 The Digital Loom. Crafted for Creators.</div>
        </div>
      </div>
    </div>
  )
}
