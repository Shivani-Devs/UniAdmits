import type { Metadata } from 'next'

import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Ontario Admissions Database',
  description: 'Real admissions data, from real applicants.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
