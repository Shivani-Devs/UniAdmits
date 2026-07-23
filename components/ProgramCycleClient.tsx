'use client'

import { useMemo, useState } from 'react'
import ApplicantCard from '@/components/ApplicantCard'
import Filters, { type FilterState } from '@/components/Filters'
import Link from 'next/link'

type Submission = {
  id: string
  average: number
  province: string | null
  status: 'accepted' | 'rejected' | 'waitlisted'
  verified: boolean
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
    verified: false,
    accepted: false
  })

  const filteredSubmissions = useMemo(() => {
    return initialSubmissions.filter((submission) => {
      const matchesAverage =
        submission.average >= filters.avg[0] && submission.average <= filters.avg[1]

      const matchesProvince = (() => {
        if (!filters.province) return true
        return submission.province === filters.province
      })()

      const matchesCycle = (() => {
        if (!filters.cycle) return true
        return submission.cycle === filters.cycle
      })()

      const matchesVerified = filters.verified ? submission.verified : true
      const matchesAccepted = filters.accepted ? submission.status === 'accepted' : true

      return matchesAverage && matchesProvince && matchesCycle && matchesVerified && matchesAccepted
    })
  }, [filters, initialSubmissions])

  const accepted = filteredSubmissions.filter((submission) => submission.status === 'accepted')
  const rate = filteredSubmissions.length
    ? Math.round((accepted.length / filteredSubmissions.length) * 100)
    : 0
  const avgAccepted = accepted.length
    ? (accepted.reduce((sum, submission) => sum + submission.average, 0) / accepted.length).toFixed(1)
    : '—'

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800 p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <Link href={`/${university}`} className="text-sm text-slate-400 hover:text-slate-300 transition">
            ← Back to {programData?.universities?.name}
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold mt-4">{programData?.name}</h1>
          <p className="text-slate-400 text-lg mt-2">
            {programData?.universities?.name} · {programData?.faculty}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          <Stat label="Acceptance rate" value={`${rate}%`} />
          <Stat label="Avg Accepted" value={`${avgAccepted}%`} />
          <Stat label="Total Reports" value={filteredSubmissions.length} />
          <Stat label="Year" value={year} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters onChange={setFilters} />
          </div>
          <div className="lg:col-span-3 space-y-6">
            {filteredSubmissions.map((submission) => (
              <ApplicantCard key={submission.id} submission={submission as any} />
            ))}
            {filteredSubmissions.length === 0 && (
              <p className="text-slate-500 text-lg text-center py-12">No submissions match these filters.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 lg:p-6 hover:border-slate-700 transition">
      <div className="text-2xl lg:text-3xl font-bold text-white">{value}</div>
      <div className="text-sm text-slate-500 mt-2">{label}</div>
    </div>
  )
}
