import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirect') || '/profile'
  return NextResponse.redirect(redirectTo)
}
