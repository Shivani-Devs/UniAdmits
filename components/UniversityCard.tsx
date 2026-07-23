import Link from 'next/link'

type University = {
  id: string
  name: string
  slug: string
  location?: string
  programs?: { count: number }[]
}

export default function UniversityCard({ university }: { university: University }) {
  const count = university.programs?.[0]?.count ?? 0

  return (
    <Link
      href={`/${university.slug}`}
      className="
        flex justify-between items-center 
        bg-white 
        border border-[#2A4E8A] 
        rounded-xl 
        p-5 
        shadow-sm 
        hover:shadow-md 
        hover:border-[#3D6BB3] 
        transition
        text-[#1C3A6B]
      "
    >
      <div>
        <div className="font-semibold text-lg">{university.name}</div>
        <div className="text-[#475569] text-xs">{university.location}</div>
      </div>

      <span className="text-[#1C3A6B] text-xs font-medium">
        {count} reports
      </span>
    </Link>
  )
}
