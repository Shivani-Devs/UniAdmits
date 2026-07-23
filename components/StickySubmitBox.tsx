'use client'

import Link from 'next/link'

export default function StickySubmitBox() {
  return (
    <Link
      href="/submit"
      className="fixed bottom-6 right-6 bg-[#0d3473] hover:bg-[#114496] text-white font-semibold px-5 py-3 rounded-lg shadow-lg border border-[#114496] transition-all"
    >
      Submit Your Decisions!
    </Link>
  )
}
