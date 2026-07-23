export function flagOutliers(average: number, status: string): string[] {
  const flags: string[] = []
  if (average < 0 || average > 100) flags.push('invalid_average')
  if (status === 'accepted' && average < 60) flags.push('low_average_for_acceptance')
  return flags
}

export async function isDuplicate(
  supabase: any,
  userId: string,
  programId: string,
  year: number
): Promise<boolean> {
  const { data } = await supabase
    .from('submissions')
    .select('id')
    .eq('user_id', userId)
    .eq('program_id', programId)
    .eq('year', year)

  return (data?.length ?? 0) > 0
}

export function uniquenessScore(average: number, allAverages: number[]): number {
  if (allAverages.length === 0) return 100
  const mean = allAverages.reduce((a, b) => a + b, 0) / allAverages.length
  const distance = Math.abs(average - mean)
  return Math.max(0, Math.min(100, Math.round(100 - distance * 2)))
}
