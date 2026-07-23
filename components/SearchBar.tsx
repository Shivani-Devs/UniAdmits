'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Result = { id: string; name: string; slug: string }

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const supabase = createClient()

  async function handleChange(value: string) {
    setQuery(value)
    if (!value) {
      setResults([])
      return
    }
    const { data } = await supabase
      .from('universities')
      .select('id, name, slug')
      .ilike('name', `%${value}%`)
      .limit(6)
    setResults(data ?? [])
  }

  return (
    <div className="relative max-w-md mx-auto mt-6">
     
      <input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search universities..."
          className="w-full px-4 py-3 rounded-lg bg-white text-[#1C3A6B] border border-[#2A4E8A] shadow-sm focus:ring-2 focus:ring-[#3D6BB3] focus:border-[#3D6BB3] outline-none transition"

      />
      {results.length > 0 && (
        <ul className="absolute w-full bg-[#ffffff] bg-slate-900 border border-slate-700 rounded-lg mt-1 z-10 overflow-hidden">
          {results.map((r) => (
            <li key={r.id}>
              <Link href={`/${r.slug}`} className="block px-4 py-2 text-sm text-[#031147]hover:bg-slate-800">
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
