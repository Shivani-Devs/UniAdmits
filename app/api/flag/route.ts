import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { submissionId, reason } = await req.json()
  const supabase = await createClient()

  await supabase.from('submission_flags').insert({ submission_id: submissionId, reason })

  return NextResponse.json({ ok: true })
}
