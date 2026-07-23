import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { submissionId, decision } = await req.json()
  const supabase = await createClient()

  await supabase.from('offer_letters').update({ status: decision }).eq('submission_id', submissionId)

  if (decision === 'approved') {
    await supabase.from('submissions').update({ verified: true }).eq('id', submissionId)
  }

  return NextResponse.json({ ok: true })
}
