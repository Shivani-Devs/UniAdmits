import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ProgramListClient from '@/components/ProgramListClient'
import StickySubmitBox from '@/components/StickySubmitBox'

export default async function UniversityPage(props: {
  params: Promise<{ university: string }>
}) {
  const { university } = await props.params
  const supabase = await createClient()

  const { data: uni } = await supabase
    .from('universities')
    .select('*, programs(*)')
    .eq('slug', university)
    .single()

  if (!uni) return <main className="p-8">University not found.</main>

  return (
    <main className="bg-white min-h-screen">

      {/* Dark Header */}
      <div className="bg-slate-900 p-8 text-white">
        <Link href="/" className="text-lg text-slate-400">
          ← All universities
        </Link>

        <h1 className="text-5xl font-bold mt-2">{uni.name}</h1>
        <p className="text-slate-400 text-xl mt-5">{uni.location}</p>

        {uni.description && (
          <p className="text-slate-500 text-sm mt-2">{uni.description}</p>
        )}
      </div>

      {/* White Programs Section */}
      <div className="max-w-3xl mx-auto p-6 bg-white">
        <h2 className="text-sm text-gray-600 mb-3">
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
