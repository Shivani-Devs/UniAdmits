import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ProgramListClient from '@/components/ProgramListClient'
import StickySubmitBox from '@/components/StickySubmitBox'

export default async function UniversityPage({
  params
}: {
  params: Promise<{ university: string }>
}) {
  const { university } = await params
  const supabase = await createClient()

  const { data: uni } = await supabase
    .from('universities')
    .select('*, programs(*)')
    .eq('slug', university)
    .single()

  if (!uni) return <main className="p-8">University not found.</main>

  return (
    <main>
      <div className="bg-slate-900 p-8 ">
        <Link href="/" className="text-lg text-slate-500">
          ← All universities
        </Link>
        <h1 className="text-5xl font-bold mt-2">{uni.name}</h1>
        <p className="text-slate-400 text-xl mt-5">{uni.location}</p>
        {uni.description && (
          <p className="text-slate-500 text-sm mt-2">{uni.description}</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto p-6 ">
        <h2 className="text-sm text-slate-500 mb-3">
          Programs ({uni.programs?.length ?? 0})
        </h2>

        <ProgramListClient
          programs={uni.programs ?? []}
          university={university}
        />
      </div>
      
      <StickySubmitBox />

    </main>
    
  )
}
