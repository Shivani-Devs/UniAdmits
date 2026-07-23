'use client'

import { useEffect, useState } from 'react'

export type FilterState = {
  avg: [number, number]
  province: string
  cycle: string
  verified: boolean
  accepted: boolean
}

type FilterProps = {
  onChange: (filters: FilterState) => void
}

export default function Filters({ onChange }: FilterProps) {
  const [avg, setAvg] = useState<[number, number]>([50, 100])
  const [province, setProvince] = useState<string>('')
  const [cycle, setCycle] = useState<string>('')
  const [verified, setVerified] = useState<boolean>(false)
  const [accepted, setAccepted] = useState<boolean>(false)

  useEffect(() => {
    onChange({ avg, province, cycle, verified, accepted })
  }, [accepted, avg, cycle, onChange, province, verified])

  return (
    <div className="space-y-6 bg-slate-900 p-6 rounded-lg border border-slate-800">
      {/* Average Range */}
      <div>
        <label className="text-base font-semibold text-slate-200">Average Range</label>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-slate-400">Minimum: {avg[0]}%</div>
            <input
              type="range"
              min="50"
              max="100"
              value={avg[0]}
              onChange={e => {
                setAvg([+e.target.value, avg[1]])
              }}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm text-slate-400">Maximum: {avg[1]}%</div>
            <input
              type="range"
              min="50"
              max="100"
              value={avg[1]}
              onChange={e => {
                setAvg([avg[0], +e.target.value])
              }}
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-3 text-sm text-slate-500">{avg[0]}% – {avg[1]}%</div>
      </div>

      {/* Province */}
      <div>
        <label className="text-base font-semibold text-slate-200">Province</label>
        <select
          className="mt-3 bg-slate-800 p-3 rounded w-full text-slate-200 border border-slate-700 focus:border-blue-500 focus:outline-none"
          value={province}
          onChange={e => {
            setProvince(e.target.value)
          }}
        >
          <option value="">All Provinces</option>
          <option value="Ontario">Ontario</option>
          <option value="Non-Ontario">Non-Ontario</option>
          <option value="International">International</option>
         
        </select>
      </div>

      {/* Applicant Cycle */}
      <div>
        <label className="text-base font-semibold text-slate-200">Applicant Cycle</label>
        <select
          className="mt-3 bg-slate-800 p-3 rounded w-full text-slate-200 border border-slate-700 focus:border-blue-500 focus:outline-none"
          value={cycle}
          onChange={e => {
            setCycle(e.target.value)
          }}
        >
          <option value="">All Cycles</option>
          <option value="2025-2026">2025-2026</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </div>

      {/* Verified */}
      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="verified"
          checked={verified}
          onChange={e => {
            setVerified(e.target.checked)
          }}
          className="w-5 h-5 rounded"
        />
        <label htmlFor="verified" className="text-base text-slate-200 cursor-pointer">
          Verified Only
        </label>
      </div>

      {/* Accepted */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="accepted"
          checked={accepted}
          onChange={e => {
            setAccepted(e.target.checked)
          }}
          className="w-5 h-5 rounded"
        />
        <label htmlFor="accepted" className="text-base text-slate-200 cursor-pointer">
          Accepted Only
        </label>
      </div>
    </div>
  )
}
