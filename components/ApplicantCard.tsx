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
  accepted: 'bg-green-600 text-white',
  rejected: 'bg-red-600 text-white',
  waitlisted: 'bg-yellow-500 text-black'
}

function formatMonth(dateString: string | null): string {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ApplicantCard({ submission }: { submission: Submission }) {
  return (
    <div className="bg-white border border-blue-600 rounded-xl p-6 lg:p-8 shadow-sm">

      {/* Top Row */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex items-center gap-3 text-base text-black">
          {submission.verified && (
            <span className="text-blue-700 font-semibold">✔ Verified</span>
          )}

          <span className="text-xl font-bold text-black">
            {submission.province || 'International'}
          </span>

          {submission.cycle && (
            <span className="text-gray-600 text-xl font-medium">
              · {submission.cycle}
            </span>
          )}
        </div>

        <span
          className={`text-sm px-3 py-1 rounded font-medium whitespace-nowrap ${statusColor[submission.status]}`}
        >
          {submission.status}
        </span>
      </div>

      {/* RESPONSIVE STATS */}
      <div className="mt-10 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 text-center w-full">

          {/* Average */}
          <div className="bg-white border border-blue-600 rounded-lg px-10 py-3 flex-1 mx-1">
            <div className="text-2xl font-bold text-blue-700">
              {submission.average}%
            </div>
            <div className="text-gray-600 text-xs font-semibold uppercase tracking-wider mt-3">
              Average
            </div>
          </div>

          {/* Applied */}
          <div className="bg-white border border-blue-600 rounded-lg px-10 py-3 flex-1 mx-1">
            <div className="text-xl font-bold text-blue-700">
              {formatMonth(submission.date_applied)}
            </div>
            <div className="text-gray-600 text-xs font-semibold uppercase tracking-wider mt-3">
              Applied
            </div>
          </div>

          {/* Decision */}
          <div className="bg-white border border-blue-600 rounded-lg px-10 py-3 flex-1 mx-1">
            <div className="text-xl font-bold text-blue-700">
              {formatMonth(submission.date_decision)}
            </div>
            <div className="text-gray-600 text-xs font-semibold uppercase tracking-wider mt-3">
              Decision
            </div>
          </div>

        </div>
      </div>

      {/* Extracurriculars */}
      {submission.extracurriculars && submission.extracurriculars.length > 0 && (
        <div className="mt-6">
          <div className="text-black text-sm font-bold uppercase tracking-wider mb-2">
            Extracurriculars
          </div>
          <p className="text-sm text-gray-700 leading-relaxed border-l-2 border-blue-600 pl-3 break-words max-w-full">
            {submission.extracurriculars.map(ec => ec.activity_name).join(', ')}
          </p>
        </div>
      )}

      {/* Notes */}
      {submission.supplemental_notes && (
        <div className="mt-4">
          <div className="text-black text-sm font-bold uppercase tracking-wider mb-1">
            Notes
          </div>
          <p className="text-sm text-gray-700 leading-relaxed border-l-2 border-blue-600 pl-3 break-words max-w-full">
            {submission.supplemental_notes}
          </p>
        </div>
      )}
    </div>
  )
}
