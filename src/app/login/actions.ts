'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const next = (formData.get('next') as string) || '/'

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=Invalid email or password')
  }

  revalidatePath('/', 'layout')
  redirect(next)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const next = (formData.get('next') as string) || '/'

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?error=Could not sign up user')
  }

  revalidatePath('/', 'layout')
  redirect(next)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signInWithGoogle(formData: FormData) {
  const headersList = await headers()
  const origin = headersList.get('host') 
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

  const next = (formData.get('next') as string) || '/'
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${protocol}://${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  })

  // Provide the redirect in the Server Action context
  if (data.url) {
    redirect(data.url)
  }

  if (error) {
    redirect('/login?error=Could not authenticate with Google')
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string
  const headersList = await headers()
  const origin = headersList.get('host') 
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

  const supabase = await createClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${protocol}://${origin}/update-password`,
  })

  if (error) {
    redirect('/forgot-password?error=Could not send reset email')
  }

  redirect('/forgot-password?message=Check your email for the reset link')
}
