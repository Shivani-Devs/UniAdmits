import { createClient } from '@/lib/supabase/server'
import ApplicantCard from '@/components/ApplicantCard'

export default async function RecentPage() {
  const supabase = await createClient()
  const { data: submissions } = await supabase
    .from('submissions')
    .select('*, extracurriculars(*), programs(name, universities(name))')
    .order('created_at', { ascending: false })
    .limit(30)

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Recent Decisions</h1>
      <div className="space-y-3">
        {submissions?.map((s: any) => (
          <div key={s.id}>
            <p className="text-xs text-slate-500 mb-1">
              {s.programs?.name} — {s.programs?.universities?.name}
            </p>
            <ApplicantCard submission={s} />
          </div>
        ))}
      </div>
    </main>
  )
}
