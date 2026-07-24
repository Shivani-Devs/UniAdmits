'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProgramListClient({
  programs,
  university
}: {
  programs: any[]
  university: string
}) {
  const [search, setSearch] = useState('')

  const filtered = programs.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search programs..."
        className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-sm"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Filtered Program List */}
      <div className="space-y-2">
        {filtered.map((p: any) => (
          <Link
            key={p.id}
            href={`/${university}/${p.slug}/2026`}
            className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-slate-600"
          >
            <div>
              <div className="text-xl font-semibold">{p.name}</div>
              <div className="text-slate-500 text-md">
                {p.faculty} · {p.degree}
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-slate-500 text-md">No matching programs.</p>
        )}
      </div>
    </div>
  )
}
