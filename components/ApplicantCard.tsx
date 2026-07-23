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

const statusColor: Record<string, string> = {
  accepted: 'bg-green-600',
  rejected: 'bg-red-600',
  waitlisted: 'bg-yellow-600'
}

function formatMonth(dateString: string | null): string {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ApplicantCard({ submission }: { submission: Submission }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 lg:p-8 hover:border-slate-700 transition">

      {/* Top Row */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex items-center gap-3 text-base text-slate-300">
          {submission.verified && <span className="text-blue-400 font-medium">✔ Verified</span>}
          <span className="text-xl font-semibold">{submission.province || 'International'}</span>
          {submission.cycle && (
            <span className="text-slate-400 text-xl font-semibold">· {submission.cycle}</span>
          )}
        </div>

        <span className={`text-sm px-3 py-1 rounded font-medium whitespace-nowrap ${statusColor[submission.status]}`}>
          {submission.status}
        </span>
      </div>

      {/* HORIZONTAL BOXED STATS */}
      <div className="mt-10 flex flex-col items-center">
        <div className="flex flex-row justify-center gap-10 text-center w-full">

          {/* Average */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg px-18 py-3 flex-1 mx-1">
            <div className="text-2xl font-bold text-white">
              {submission.average}%
            </div>
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-3">
              Average
            </div>
          </div>

          {/* Applied */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg px-18 py-3 flex-1 mx-1">
            <div className="text-xl font-bold text-white">
              {formatMonth(submission.date_applied)}
            </div>
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-3">
              Applied
            </div>
          </div>

          {/* Decision */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg px-18 py-3 flex-1 mx-1">
            <div className="text-xl font-bold text-white">
              {formatMonth(submission.date_decision)}
            </div>
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-3">
              Decision
            </div>
          </div>

        </div>
      </div>

      {/* Extracurriculars — title larger + bold */}
      {submission.extracurriculars && submission.extracurriculars.length > 0 && (
        <div className="mt-6">
          <div className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-2">
            Extracurriculars
          </div>
          <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-3">
            {submission.extracurriculars.map((ec) => ec.activity_name).join(', ')}
          </p>
        </div>
      )}

      {/* Notes — title larger + bold */}
      {submission.supplemental_notes && (
        <div className="mt-4">
          <div className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-1">
            Notes
          </div>
          <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-3">
            {submission.supplemental_notes}
          </p>
        </div>
      )}
    </div>
  )
}
