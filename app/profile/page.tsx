import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/DashboardClients'
import SubmissionGridClient from '@/components/SubmissionGridClient'

function formatMonth(dateString: string | null): string {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: submissions } = await supabase
  .from('submissions')
  .select(`
    id,
    average,
    province,
    status,
    date_applied,
    date_decision,
    cycle,
    programs (
      name,
      universities (
        name
      )
    )
  `)
  .eq('user_id', user.id)

  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'there'

  return (
    <main className="min-h-screen bg-slate-950 p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-white">
          Hi {userName} 👋
        </h1>

        <p className="text-slate-400 mb-8 text-lg">
          Here are your submissions.
        </p>

        <a
          href="/submit"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 lg:px-8 py-3 lg:py-4 rounded text-white font-medium mb-8 lg:mb-12 transition text-lg"
        >
          + Submit New Result
        </a>

        {submissions?.length === 0 && (
          <p className="text-slate-500 text-xl">You haven't submitted anything yet.</p>
        )}

        {/* ⭐ ONLY wrap the interactive card grid */}
  <DashboardClient submissions={submissions ?? []} />
       
      </div>
    </main>
  )
}
