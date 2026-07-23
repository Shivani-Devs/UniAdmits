import { createClient } from '@/lib/supabase/server'
import MultiSubmitForm from '@/components/MultiSubmitForm'
import { redirect } from 'next/navigation'

export default async function SubmitPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: universities } = await supabase
    .from('universities')
    .select('id, name')
    .order('name')

  const { data: programs } = await supabase
    .from('programs')
    .select('id, name, university_id')
    .order('name')

  return (
    <main className="max-w-5xl mx-auto p-10">
      <MultiSubmitForm
        userId={user.id}
        universities={universities ?? []}
        programs={programs ?? []}
      />
    </main>
  )

  

}
