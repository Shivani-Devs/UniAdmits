import { createClient } from '@/lib/supabase/server'
import ProgramCycleClient from '@/components/ProgramCycleClient'
import StickySubmitBox from '@/components/StickySubmitBox'
import Link from 'next/link'

export default async function ProgramPage(props: {
  params: Promise<{ university: string; program: string; year: string }>
}) {
  const { university, program, year } = await props.params
  const supabase = await createClient()

  const { data: programData } = await supabase
    .from('programs')
    .select('id, name, faculty, slug, university_id')
    .eq('slug', program)
    .single()

  if (!programData) {
    return <main className="p-8">Program not found.</main>
  }

  const { data: uniData } = await supabase
    .from('universities')
    .select('name')
    .eq('id', programData.university_id)
    .single()

  const { data: submissions } = await supabase
    .from('submissions')
    .select(`
      id,
      average,
      province,
      status,
      cycle,
      date_applied,
      date_decision,
      supplemental_notes,
      extracurriculars (
        id,
        activity_name,
        category,
        position
      )
    `)
    .eq('program_id', programData.id)
    .eq('year', Number(year))
    .order('created_at', { ascending: false })

  return (
    <main className="bg-white min-h-screen">

      {/* BLUE HEADER (KEEP THIS) */}
      <div className="w-full bg-[#0b1629] text-white p-8">
        <Link
          href={`/${university}`}
          className="text-blue-300 hover:text-blue-400 font-medium"
        >
          ← Back to {uniData?.name}
        </Link>

        <h1 className="text-4xl font-bold mt-4">{programData.name}</h1>
        <p className="text-slate-300 text-lg mt-1">
          {uniData?.name} · {programData.faculty}
        </p>
      </div>

      {/* EVERYTHING BELOW IS WHITE */}
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <ProgramCycleClient
          initialSubmissions={submissions ?? []}
          university={university}
          year={year}
          programData={{
            name: programData.name,
            faculty: programData.faculty,
            universities: uniData
          }}
        />
      </div>

      <StickySubmitBox />
    </main>
  )
}
