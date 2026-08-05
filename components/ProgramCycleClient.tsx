'use client'

import { useMemo, useState } from 'react'
import ApplicantCard from '@/components/ApplicantCard'
import Filters, { type FilterState } from '@/components/Filters'

type Submission = {
  id: string
  average: number
  province: string | null
  status: 'accepted' | 'rejected' | 'waitlisted'
  date_applied: string | null
  date_decision: string | null
  supplemental_notes: string | null
  cycle?: string
  extracurriculars?: { id: string; activity_name: string }[]
}

type ProgramCycleClientProps = {
  initialSubmissions: Submission[]
  university: string
  year: string
  programData: {
    name?: string | null
    faculty?: string | null
    universities?: { name?: string | null } | null
  } | null
}

export default function ProgramCycleClient({
  initialSubmissions,
  university,
  year,
  programData
}: ProgramCycleClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    avg: [50, 100],
    province: '',
    cycle: '',
    accepted: false
  })

  // NEW: mobile filter toggle
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredSubmissions = useMemo(() => {
    return initialSubmissions.filter((submission) => {
      const matchesAverage =
        submission.average >= filters.avg[0] && submission.average <= filters.avg[1]

      const matchesProvince = !filters.province || submission.province === filters.province
      const matchesCycle = !filters.cycle || submission.cycle === filters.cycle
      const matchesAccepted = filters.accepted ? submission.status === 'accepted' : true

      return matchesAverage && matchesProvince && matchesCycle && matchesAccepted
    })
  }, [filters, initialSubmissions])

  const accepted = filteredSubmissions.filter((s) => s.status === 'accepted')
  const rate = filteredSubmissions.length
    ? Math.round((accepted.length / filteredSubmissions.length) * 100)
    : 0

  const avgAccepted = accepted.length
    ? (accepted.reduce((sum, s) => sum + s.average, 0) / accepted.length).toFixed(1)
    : '—'

  return (
    <main className="bg-white min-h-screen">

      {/* BLUE HEADER IS IN page.tsx — removed here */}

      <div className="max-w-7xl mx-auto p-8 lg:p-12">

        {/* WHITE STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Stat label="Acceptance rate" value={`${rate}%`} />
          <Stat label="Avg Accepted" value={`${avgAccepted}%`} />
          <Stat label="Total Reports" value={filteredSubmissions.length} />
          <Stat label="Year" value={year} />
        </div>

        {/* FILTERS + SUBMISSIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* FILTERS — collapsible on phones */}
          <div className="lg:col-span-1">

            {/* Mobile toggle button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="md:hidden w-full bg-blue-700 text-white py-2 rounded-lg font-semibold mb-4"
            >
              {filtersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Filters box */}
            <div className={`${filtersOpen ? 'block' : 'hidden'} md:block`}>
              <Filters onChange={setFilters} />
            </div>
          </div>

          {/* SUBMISSION CARDS */}
          <div className="lg:col-span-3 space-y-6">
            {filteredSubmissions.map((submission) => (
              <ApplicantCard key={submission.id} submission={submission as any} />
            ))}

            {filteredSubmissions.length === 0 && (
              <p className="text-gray-600 text-lg text-center py-12">
                No submissions match these filters.
              </p>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border border-blue-600 rounded-xl p-6 shadow-sm">
      <div className="text-2xl lg:text-3xl font-bold text-blue-700">{value}</div>
      <div className="text-sm text-gray-600 mt-2">{label}</div>
    </div>
  )
}
