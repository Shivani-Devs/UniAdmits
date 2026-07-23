import { createClient } from '@/lib/supabase/server'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', auth.user?.id ?? '')
    .single()

  if (profile?.role !== 'admin') {
    return <main className="p-8 text-slate-400">Admin access required.</main>
  }

  const { data: pendingLetters } = await supabase
    .from('offer_letters')
    .select('*, submissions(id, average, status)')
    .eq('status', 'pending')

  const { data: flags } = await supabase
    .from('submission_flags')
    .select('*, submissions(id, average, status)')

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      <section>
        <h2 className="text-sm text-slate-500 mb-2">Pending Offer Letters ({pendingLetters?.length ?? 0})</h2>
        <div className="space-y-2">
          {pendingLetters?.map((l: any) => (
            <div key={l.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex justify-between items-center">
              <span className="text-sm">
                {l.submissions?.average}% · {l.submissions?.status}
              </span>
              <div className="flex gap-2">
                <form action="/api/verify" method="post">
                  <button className="text-xs bg-green-600 rounded px-3 py-1">Approve</button>
                </form>
                <form action="/api/verify" method="post">
                  <button className="text-xs bg-red-600 rounded px-3 py-1">Reject</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm text-slate-500 mb-2">Flagged Submissions ({flags?.length ?? 0})</h2>
        <div className="space-y-2">
          {flags?.map((f: any) => (
            <div key={f.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <p className="text-sm">{f.reason}</p>
              <p className="text-xs text-slate-500">
                {f.submissions?.average}% · {f.submissions?.status}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
