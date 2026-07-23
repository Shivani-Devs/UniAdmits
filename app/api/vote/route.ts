import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { submissionId, voteType } = await req.json()
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()

  if (!auth.user) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  }

  await supabase.from('submission_votes').upsert(
    { submission_id: submissionId, user_id: auth.user.id, vote_type: voteType },
    { onConflict: 'submission_id,user_id' }
  )

  return NextResponse.json({ ok: true })
}
