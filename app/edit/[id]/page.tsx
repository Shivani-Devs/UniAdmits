type EditPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-2xl rounded-lg border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-2xl font-semibold">Edit item</h1>
        <p className="mt-2 text-sm text-slate-400">Editing item with id: {id}</p>
      </div>
    </main>
  )
}
