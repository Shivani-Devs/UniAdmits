'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import SubmissionGridClient from './SubmissionGridClient'

export default function DashboardClient({ submissions }: { submissions: any[] }) {
  const supabase = createClient()

  const [items, setItems] = useState(submissions)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  async function deleteSubmission(id: string) {
    await supabase.from('submissions').delete().eq('id', id)
    setItems(prev => prev.filter(s => s.id !== id))
    setToast('Deleted')
    setConfirmDeleteId(null)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="relative">

      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[100]">
          {toast}
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Delete this submission?</h2>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => deleteSubmission(confirmDeleteId)}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ Render the grid INSIDE the client component */}
      <SubmissionGridClient
        submissions={items}
        onDelete={(id) => setConfirmDeleteId(id)}
      />
    </div>
  )
}
