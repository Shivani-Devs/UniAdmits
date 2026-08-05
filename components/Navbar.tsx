'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const supabase = createClient()
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)

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
    setMenuOpen(false)
  }

  return (
    <nav className="w-full bg-[#0b1629] border-b border-slate-800 p-4 flex items-center justify-between relative">
      
      {/* Logo */}
      <Link href="/" className="text-white font-bold text-xl">
        UniLore
      </Link>

      {/* MOBILE HAMBURGER — only on phones */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex flex-col gap-1.5 p-2 rounded hover:bg-slate-800 transition lg:hidden"
      >
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>

      {/* DESKTOP NAV — unchanged */}
      <div className="hidden lg:flex items-center gap-6">
        <Link href="/universities" className="text-slate-300 hover:text-white text-lg font-semibold">
          Universities
        </Link>

        {!user && (
          <>
            <Link href="/auth/login" className="text-slate-300 hover:text-white text-lg font-semibold">
              Login
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

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="absolute right-4 top-16 bg-white border border-blue-600 rounded-xl shadow-xl p-4 w-64 flex flex-col gap-4 lg:hidden">

          {/* UNIVERSITIES */}
          <Link
            href="/universities"
            className="text-blue-700 font-semibold text-lg hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Universities
          </Link>

          {/* CONDITIONAL LOGIN / LOGOUT */}
          {!user && (
            <>
              <Link
                href="/auth/login"
                className="text-blue-700 font-semibold text-lg hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <div className="text-sm text-gray-700">
                Don’t have an account?
                <Link
                  href="/auth/signup"
                  className="text-blue-700 font-semibold ml-1 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Create one
                </Link>
              </div>
            </>
          )}

          {user && (
            <>
              <Link
                href="/profile"
                className="text-blue-700 font-semibold text-lg hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="text-blue-700 font-semibold text-lg text-left hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
