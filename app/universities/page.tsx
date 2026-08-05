import Link from "next/link"

export default function UniversitiesPage() {
  const universities = [
    { name: "University of Guelph", slug: "guelph", logo: "/logos/guelph.png" },
    { name: "University of Toronto", slug: "uoft", logo: "/logos/toronto.png" },
    { name: "University of Waterloo", slug: "waterloo", logo: "/logos/waterloo.png" },
    { name: "Queen's University", slug: "queens", logo: "/logos/queens.png" }
  ]

  return (
    <main className="min-h-screen bg-white">

      <div className="bg-slate-900 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-wide">UNIVERSITIES</h1>
      </div>

      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {universities.map((u) => (
          <Link
  key={u.slug}
  href={`/${u.slug}`}
  className="
    bg-white border border-gray-200 rounded-xl p-10
    flex flex-col items-center justify-center
    shadow-sm transition-all duration-300
    hover:shadow-2xl hover:scale-110 hover:border-blue-500
    h-64
  "
>
 <div className="w-full h-64 flex items-center justify-center">
  <img
    src={u.logo}
    alt={u.name}
    className="h-full w-auto object-contain"
  />
</div>
</Link>
        ))}
      </div>
    </main>
  )
}

