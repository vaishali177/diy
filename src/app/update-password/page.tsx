import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function UpdatePasswordPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams
  const errorMessage = searchParams?.error

  const updatePassword = async (formData: FormData) => {
    'use server'
    const password = formData.get('password') as string
    const supabaseClient = await createClient()
    
    // Auth helpers automatically look at the URL hash or server session
    // to identify the user before updating. 
    const { error } = await supabaseClient.auth.updateUser({
      password: password
    })

    if (error) {
      redirect('/update-password?error=Could not update password')
    }

    redirect('/')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1e2d34]">
      <form action={updatePassword} className="bg-[#615e65] text-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Password</h2>
        <p className="text-sm text-center text-white/80 mb-2">Please enter your new password below.</p>
        
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded text-sm text-center">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="password">New Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            required 
            className="p-2 rounded bg-[#1e2d34] border border-[#d07023] text-white outline-none focus:border-[#b85e1a] transition-colors" 
          />
        </div>
        
        <button type="submit" className="mt-4 bg-[#d07023] hover:bg-[#b85e1a] py-2 rounded font-semibold transition-colors cursor-pointer text-center">
          Update Password
        </button>
      </form>
    </div>
  )
}
