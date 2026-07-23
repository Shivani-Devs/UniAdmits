import { createClient } from '@/lib/supabase/server'
import SearchBar from '@/components/SearchBar'
import UniversityCard from '@/components/UniversityCard'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: universities } = await supabase
    .from('universities')
    .select('id, name, slug, location, programs(count)')

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#1C3A6B]">

      {/* HERO */}
      <section className="py-20 lg:py-28 px-6 border-b border-[#DDE1E8] bg-[#0b1629]">
        <div className="max-w-5xl mx-auto text-center">

          <span className="text-sm text-[#ffffff] bg-[#0b1629] px-4 py-2 rounded-full border border-[#DDE1E8] inline-block">
            Ontario University Admissions Database
          </span>

          <h1 className="text-4xl text-[#ffffff] lg:text-6xl font-bold mt-8 leading-tight">
            Real admissions data,
            <br className="hidden sm:block text-[#ffffff]" />
            from real applicants.
          </h1>

          <p className="text-lg text-[#d1d6eb] mt-6 max-w-2xl mx-auto">
            Browse verified acceptance decisions, averages, and extracurriculars across Ontario universities.
          </p>

          <div className="mt-10">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-10">
          Browse Universities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities?.map((u: any) => (
            <div
              key={u.id}
              className="bg-white border border-[#DDE1E8] rounded-xl shadow-sm hover:shadow-md transition"
            >
              <UniversityCard university={u} />
            </div>
          ))}
        </div>
      </section>

      {/* SUBMIT CTA */}
      <section className="py-20 bg-white border-t border-[#DDE1E8] px-6">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Want to help future applicants?
          </h2>

          <p className="text-lg text-[#475569] mb-10">
            Share your admission result to help others understand real acceptance trends.
          </p>

          {user ? (
            <a
              href="/submit"
              className="inline-block bg-[#2A4E8A] hover:bg-[#3D6BB3] px-10 py-4 rounded-lg text-white font-medium transition text-lg shadow-sm"
            >
              Submit Your Uni Decisions
            </a>
          ) : (
            <a
              href="/auth/login?redirect=/profile"
              className="inline-block bg-[#114496] hover:bg-[#3D6BB3] px-10 py-4 rounded-lg text-white font-medium transition text-lg shadow-sm"
            >
              Submit Your Uni Decisions
            </a>
          )}
        </div>
      </section>

    </main>
  )
}
