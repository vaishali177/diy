import { resetPassword } from '@/app/login/actions'
import Link from 'next/link'

export default async function ForgotPasswordPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams
  const errorMessage = searchParams?.error
  const successMessage = searchParams?.message

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1e2d34]">
      <form className="bg-[#615e65] text-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Reset Password</h2>
        <p className="text-sm text-center text-white/80 mb-2">Enter your email and we will send you a reset link.</p>
        
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded text-sm text-center">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500/20 border border-green-500 text-green-100 p-3 rounded text-sm text-center">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            className="p-2 rounded bg-[#1e2d34] border border-[#d07023] text-white outline-none focus:border-[#b85e1a] transition-colors" 
          />
        </div>
        
        <button formAction={resetPassword} className="mt-4 bg-[#d07023] hover:bg-[#b85e1a] py-2 rounded font-semibold transition-colors cursor-pointer text-center">
          Send Reset Link
        </button>
        <Link href="/login" className="text-center text-sm mt-4 hover:underline text-white/50 transition-colors">Back to Login</Link>
      </form>
    </div>
  )
}
