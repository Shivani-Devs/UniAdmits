'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const supabase = createClient()
  const router = useRouter()

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    load()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    router.refresh()
  }

  useEffect(() => {
  async function load() {
    const { data } = await supabase.auth.getUser()
    console.log("USER:", data.user)
  }
  load()
}, [])


  return (
    <nav className="w-full bg-slate-900 border-b bg-[#0b1629] border-slate-800 p-4 flex items-center justify-between">
      <a href="/" className="text-white font-bold text-xl">
        Ontario Admissions DB
      </a>

      <div className="flex items-center gap-4">
        {!user && (
          <>
            <a href="/auth/login" className="text-slate-300 hover:text-white text-lg font-semibold">
              Login
            </a>
            <a href="/auth/signup" className="text-slate-300 hover:text-white text-lg font-semibold">
              Sign Up
            </a>
          </>
        )}

        {user && (
          <>
            <a href="/profile" className="text-slate-300 hover:text-white text-lg font-semibold">
              Dashboard
            </a>
            <button
              onClick={logout}
              className="text-slate-300 hover:text-white text-lg font-semibold"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )

  
}
