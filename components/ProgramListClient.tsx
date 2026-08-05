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
    <div className="space-y-6 bg-white p-1">

      {/* Search Bar */}
      <input
  type="text"
  placeholder="Search programs..."
  className="
    w-full p-3 rounded-lg text-sm
    bg-white border border-gray-300
    text-blue-600
    placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-600
  "
  value={search}
  onChange={e => setSearch(e.target.value)}
/>


      {/* Program List */}
      <div className="space-y-3">
        {filtered.map((p: any) => (
          <Link
            key={p.id}
            href={`/${university}/${p.slug}/2026`}
            className="
              flex items-center justify-between p-5 rounded-xl
              bg-white border border-gray-200
              hover:border-blue-500 hover:shadow-md
              transition-all duration-200
            "
          >
            <div>
              <div className="text-xl font-semibold text-black">
                {p.name}
              </div>

              <div className="text-gray-600 text-sm mt-1">
                {p.faculty} · {p.degree}
              </div>
            </div>

            {/* Arrow */}
            <div className="text-gray-400 text-xl group-hover:text-blue-600 transition">
              →
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 text-md">No matching programs.</p>
        )}
      </div>
    </div>
  )
}
