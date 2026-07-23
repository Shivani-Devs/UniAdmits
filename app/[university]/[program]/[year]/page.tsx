import { createClient } from '@/lib/supabase/server'
import ProgramCycleClient from '@/components/ProgramCycleClient'
import StickySubmitBox from '@/components/StickySubmitBox'

export default async function ProgramPage({
  params
}: {
  params: { university: string; program: string; year: string }
}) {
  const { university, program, year } = params
  const supabase = await createClient()

  const { data: programData } = await supabase
    .from('programs')
    .select('id, name, faculty, universities(name)')
    .eq('id', program)
    .single()

  if (!programData) {
    return <main className="p-8">Program not found.</main>
  }

  const { data: submissions } = await supabase
    .from('submissions')
    .select(`
      id,
      average,
      province,
      status,
      verified,
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
    .eq('program_id', program)
    .eq('year', Number(year))
    .order('created_at', { ascending: false })

  return (
    <main className="relative">
      <ProgramCycleClient
        initialSubmissions={(submissions ?? []) as any}
        university={university}
        year={year}
        programData={{
          name: programData?.name,
          faculty: programData?.faculty,
          universities: Array.isArray(programData?.universities)
            ? programData.universities[0]
            : programData?.universities
        } as any}
      />

      <StickySubmitBox />
    </main>
  )
}
