'use client'

export default function SubmissionGridClient({
  submissions,
  onDelete
}: {
  submissions: any[]
  onDelete: (id: string) => void
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {submissions.map(s => (
        <div
          key={s.id}
          className="bg-slate-900 p-6 lg:p-8 rounded-lg border border-slate-800 hover:border-slate-700 transition"
        >

          {/* ⭐ University + Program */}
          <div className="mb-4">
            <div className="font-bold text-lg text-white">
              {s.programs?.universities?.name}
            </div>
            <div className="font-semibold text-white">
              {s.programs?.name}
            </div>
          </div>

          {/* ⭐ Average (smaller now) */}
          <div className="flex justify-between items-start mb-4 lg:mb-6">
            <div>
              <div className="font-bold text-xl text-white">
                {s.average}%
              </div>
              <div className="text-slate-500 text-sm mt-1 capitalize">{s.status}</div>
            </div>
            <span className="text-slate-400 text-sm">{s.cycle}</span>
          </div>

          <div className="space-y-3 text-sm lg:text-base">
            <div>
              <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Province</div>
              <div className="text-slate-200 mt-1">{s.province || 'International'}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Applied</div>
                <div className="text-slate-200 mt-1">{s.date_applied}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Decision</div>
                <div className="text-slate-200 mt-1">{s.date_decision}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-slate-700">
            <a
              href={`/edit/${s.id}`}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition"
            >
              Edit
            </a>

            <button
              onClick={() => onDelete(s.id)}
              className="text-red-400 hover:text-red-300 text-sm font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
