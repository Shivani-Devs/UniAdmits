'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type UniDecision = {
  university: string
  program: string
  appMonth: string
  appYear: string
  decisionMonth: string
  decisionYear: string
  decision: string
}
const MONTH_MAP: Record<string, string> = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12'
}

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

const YEARS = [2023, 2024, 2025, 2026, 2027]

export default function MultiSubmitForm({
  userId,
  universities,
  programs
}: {
  userId: string
  universities: { id: string; name: string }[]
  programs: { id: string; name: string; university_id: string }[]
}) {
  const supabase = createClient()
  const router = useRouter()

  const [uniDecisions, setUniDecisions] = useState<UniDecision[]>([
    {
      university: '',
      program: '',
      appMonth: '',
      appYear: '',
      decisionMonth: '',
      decisionYear: '',
      decision: ''
    }
  ])

  const [average, setAverage] = useState('')
  const [location, setLocation] = useState('')
  const [ecs, setEcs] = useState('')
  const [notes, setNotes] = useState('')
  const [cycle, setCycle] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function updateDecision(index: number, field: keyof UniDecision, value: string) {
    const updated = [...uniDecisions]
    updated[index][field] = value

    // Reset program if university changes
    if (field === 'university') {
      updated[index].program = ''
    }

    setUniDecisions(updated)
  }

  function addUniSection() {
    setUniDecisions([
      ...uniDecisions,
      {
        university: '',
        program: '',
        appMonth: '',
        appYear: '',
        decisionMonth: '',
        decisionYear: '',
        decision: ''
      }
    ])
  }

  async function submit() {
    setLoading(true)
    setError('')

    if (Number(average) < 0 || Number(average) > 100) {
      setError('Average must be between 0 and 100')
      setLoading(false)
      return
    }

    if (ecs.length > 250 || notes.length > 250) {
      setError('ECs and Notes must be under 250 characters')
      setLoading(false)
      return
    }

    for (const uni of uniDecisions) {
      const { data: submission, error: submissionError } = await supabase
        .from('submissions')
        .insert({
          user_id: userId,
          program_id: uni.program,
          year: cycle,
          average: Number(average),
          province: location,
          status: uni.decision,
          verified: false,
          date_applied: `${uni.appYear}-${MONTH_MAP[uni.appMonth]}-01`,
          date_decision: `${uni.decisionYear}-${MONTH_MAP[uni.decisionMonth]}-01`,
          supplemental_notes: notes
        })
        .select()
        .single()

      if (submissionError) {
        setError(submissionError.message)
        setLoading(false)
        return
      }

      if (ecs.trim() !== '') {
        await supabase.from('extracurriculars').insert({
          submission_id: submission.id,
          activity_name: ecs,
          category: 'General',
          position: 'N/A'
        })
      }
    }

    setLoading(false)
    router.push('/profile')
  }

  return (
    <div className="space-y-8 bg-slate-900 p-10 rounded-xl border border-slate-700 w-full max-w-5xl mx-auto">
      {error && <div className="text-red-400 text-sm">{error}</div>}

      <h1 className="text-2xl font-bold text-white">Submit Your Decisions</h1>

      {/* Global fields */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-slate-400">Average</label>
          <input
            className="w-full p-3 bg-slate-800 rounded"
            value={average}
            onChange={e => setAverage(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">Location</label>
          <select
            className="w-full p-3 bg-slate-800 rounded"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Ontario">Ontario</option>
            <option value="Non-Ontario">Non-Ontario</option>
            <option value="International">International</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-400">Extracurriculars (250 char max)</label>
        <textarea
          maxLength={250}
          className="w-full p-3 bg-slate-800 rounded"
          value={ecs}
          onChange={e => setEcs(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-slate-400">Notes (250 char max)</label>
        <textarea
          maxLength={250}
          className="w-full p-3 bg-slate-800 rounded"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-slate-400">Application Cycle</label>
        <select
          className="w-full p-3 bg-slate-800 rounded"
          value={cycle}
          onChange={e => setCycle(e.target.value)}
        >
          <option value="">Select</option>
          <option value="2026">2025–2026</option>
          <option value="2025">2024–2025</option>
          <option value="2024">2023–2024</option>
        </select>
      </div>

      {/* Multiple university sections */}
      <div className="space-y-6">
        {uniDecisions.map((uni, i) => (
          <div key={i} className="border border-slate-700 p-6 rounded-lg bg-slate-800">
            <h2 className="text-lg font-bold text-white mb-4">University Decision {i + 1}</h2>

            {/* University + Program */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-400">University</label>
                <select
                  className="w-full p-3 bg-slate-700 rounded"
                  value={uni.university}
                  onChange={e => updateDecision(i, 'university', e.target.value)}
                >
                  <option value="">Select University</option>
                  {universities.map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400">Program</label>
                <select
                  className="w-full p-3 bg-slate-700 rounded"
                  value={uni.program}
                  onChange={e => updateDecision(i, 'program', e.target.value)}
                >
                  <option value="">Select Program</option>
                  {programs
                    .filter(p => p.university_id === uni.university)
                    .map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
              </div>
            </div>

            {/* Application Date */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="text-sm text-slate-400">Application Month</label>
                <select
                  className="w-full p-3 bg-slate-700 rounded"
                  value={uni.appMonth}
                  onChange={e => updateDecision(i, 'appMonth', e.target.value)}
                >
                  <option value="">Month</option>
                  {MONTHS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400">Application Year</label>
                <select
                  className="w-full p-3 bg-slate-700 rounded"
                  value={uni.appYear}
                  onChange={e => updateDecision(i, 'appYear', e.target.value)}
                >
                  <option value="">Year</option>
                  {YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Decision Date */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="text-sm text-slate-400">Decision Month</label>
                <select
                  className="w-full p-3 bg-slate-700 rounded"
                  value={uni.decisionMonth}
                  onChange={e => updateDecision(i, 'decisionMonth', e.target.value)}
                >
                  <option value="">Month</option>
                  {MONTHS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400">Decision Year</label>
                <select
                  className="w-full p-3 bg-slate-700 rounded"
                  value={uni.decisionYear}
                  onChange={e => updateDecision(i, 'decisionYear', e.target.value)}
                >
                  <option value="">Year</option>
                  {YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Decision */}
            <div className="mt-4">
              <label className="text-sm text-slate-400">Decision</label>
              <select
                className="w-full p-3 bg-slate-700 rounded"
                value={uni.decision}
                onChange={e => updateDecision(i, 'decision', e.target.value)}
              >
                <option value="">Select</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="waitlisted">Waitlisted</option>
              </select>
            </div>
          </div>
        ))}

        <button
          onClick={addUniSection}
          className="bg-slate-700 px-4 py-2 rounded text-white"
        >
          + Add Another University Decision
        </button>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-blue-600 p-3 rounded text-white text-lg"
      >
        {loading ? 'Submitting...' : 'Submit All'}
      </button>
    </div>
  )
}
