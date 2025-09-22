import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth')?.value

  const estaLogado = authCookie === 'logado'
  const estaNaLogin = request.nextUrl.pathname === '/login'

  // Se não estiver logado e não estiver acessando /login, redireciona para login
  if (!estaLogado && !estaNaLogin) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se estiver logado e tentar acessar /login, redireciona para dashboard
  if (estaLogado && estaNaLogin) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
