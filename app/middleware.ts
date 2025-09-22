import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('auth')?.value

  const url = request.nextUrl.pathname
  const isPublic = url.startsWith('/login')

  if (!auth && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (auth && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard', '/login'],
}
