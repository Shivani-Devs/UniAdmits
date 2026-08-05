'use client'

import { useEffect, useState } from 'react'

export type FilterState = {
  avg: [number, number]
  province: string
  cycle: string
  accepted: boolean
}

type FilterProps = {
  onChange: (filters: FilterState) => void
}

export default function Filters({ onChange }: FilterProps) {
  const [avg, setAvg] = useState<[number, number]>([50, 100])
  const [province, setProvince] = useState<string>('')
  const [cycle, setCycle] = useState<string>('')
  const [accepted, setAccepted] = useState<boolean>(false)

  useEffect(() => {
    onChange({ avg, province, cycle, accepted })
  }, [accepted, avg, cycle, onChange, province])

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-blue-600 shadow-sm">
      
      {/* Average Range */}
      <div>
        <label className="text-base font-semibold text-black">Average Range</label>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Minimum: {avg[0]}%</div>
            <input
              type="range"
              min="50"
              max="100"
              value={avg[0]}
              onChange={e => setAvg([+e.target.value, avg[1]])}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-600">Maximum: {avg[1]}%</div>
            <input
              type="range"
              min="50"
              max="100"
              value={avg[1]}
              onChange={e => setAvg([avg[0], +e.target.value])}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-700 font-medium">
          {avg[0]}% – {avg[1]}%
        </div>
      </div>

      {/* Province */}
      <div>
        <label className="text-base font-semibold text-black">Province</label>
        <select
          className="mt-3 bg-white p-3 rounded-lg w-full text-black border border-blue-600 focus:border-blue-700 focus:outline-none"
          value={province}
          onChange={e => setProvince(e.target.value)}
        >
          <option value="">All Provinces</option>
          <option value="Ontario">Ontario</option>
          <option value="Non-Ontario">Non-Ontario</option>
          <option value="International">International</option>
        </select>
      </div>

      {/* Applicant Cycle */}
      <div>
        <label className="text-base font-semibold text-black">Applicant Cycle</label>
        <select
          className="mt-3 bg-white p-3 rounded-lg w-full text-black border border-blue-600 focus:border-blue-700 focus:outline-none"
          value={cycle}
          onChange={e => setCycle(e.target.value)}
        >
          <option value="">All Cycles</option>
          <option value="2025-2026">2025-2026</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </div>

      {/* Accepted */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="accepted"
          checked={accepted}
          onChange={e => setAccepted(e.target.checked)}
          className="w-5 h-5 accent-blue-600"
        />
        <label htmlFor="accepted" className="text-base text-black cursor-pointer">
          Accepted Only
        </label>
      </div>
    </div>
  )
}
