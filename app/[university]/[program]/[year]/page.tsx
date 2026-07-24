import { createClient } from '@/lib/supabase/server'

export default async function ProgramPage({
  params,
}: {
  params: { university: string; program: string; year: string }
}) {
  const { university, program, year } = params
  const supabase = await createClient()

  // Try fetching the program
  const { data: programData, error: programError } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', program)
    .single()

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">DEBUG MODE</h1>

      <div className="bg-slate-900 p-4 rounded">
        <p><strong>URL university:</strong> {university}</p>
        <p><strong>URL program:</strong> {program}</p>
        <p><strong>URL year:</strong> {year}</p>
      </div>

      <div className="bg-slate-900 p-4 rounded">
        <p><strong>Supabase programData:</strong></p>
        <pre>{JSON.stringify(programData, null, 2)}</pre>
      </div>

      <div className="bg-slate-900 p-4 rounded">
        <p><strong>Supabase programError:</strong></p>
        <pre>{JSON.stringify(programError, null, 2)}</pre>
      </div>
    </main>
  )
}
