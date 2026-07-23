'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [error, setError] = useState('')

  async function signup() {
    const { error } = await supabase.auth.signUp({
       email,
  password,
  options: {
    data: {
      name,
      birthday
    }
  }
    })
    if (error) return setError(error.message)
    router.push('/profile')
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-lg w-80 space-y-4">
        <h1 className="text-xl font-bold">Create Account</h1>

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

        <input
        className="w-full p-2 bg-slate-800 rounded"
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
        />
        
        <input
        type="date"
        className="w-full p-2 bg-slate-800 rounded"
        value={birthday}
        onChange={e => setBirthday(e.target.value)}
        />

        <button
          onClick={signup}
          className="w-full bg-blue-600 p-2 rounded"
        >
          Sign Up
        </button>

        <a href="/auth/login" className="text-sm text-slate-400 underline">
          Already have an account?
        </a>
      </div>
    </main>
  )
}
