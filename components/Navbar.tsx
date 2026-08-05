'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

  return (
    <nav className="w-full bg-[#0b1629] border-b border-slate-800 p-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link href="/" className="text-white font-bold text-xl">
        UniLore
      </Link>

      {/* Right side links */}
      <div className="flex items-center gap-6">

        {/* UNIVERSITIES link */}
        <Link 
          href="/universities" 
          className="text-slate-300 hover:text-white text-lg font-semibold"
        >
          Universities
        </Link>

        {/* Auth links */}
        {!user && (
          <>
            <Link href="/auth/login" className="text-slate-300 hover:text-white text-lg font-semibold">
              Login
            </Link>
            <Link href="/auth/signup" className="text-slate-300 hover:text-white text-lg font-semibold">
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <>
            <Link href="/profile" className="text-slate-300 hover:text-white text-lg font-semibold">
              Dashboard
            </Link>
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
