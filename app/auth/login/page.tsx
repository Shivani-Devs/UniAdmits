'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) return setError(error.message)
    router.push('/profile')
  }

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-lg w-80 space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <input
          className="w-full p-2 bg-slate-800 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 bg-slate-800 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 p-2 rounded"
        >
          Sign In
        </button>

        <button
          onClick={loginWithGoogle}
          className="w-full bg-red-600 p-2 rounded"
        >
          Continue with Google
        </button>

        <a href="/auth/signup" className="text-sm text-slate-400 underline">
          Create an account
        </a>
      </div>
    </main>
  )
}
