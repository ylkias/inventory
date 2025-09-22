import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('auth')?.value;
  const estaLogado = authCookie === 'logado';

  const isLoginRoute = pathname.startsWith('/login');
  const isApiRoute = pathname.startsWith('/api');

  // Redireciona para login se não estiver logado e não for /login ou /api
  if (!estaLogado && !isLoginRoute && !isApiRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redireciona para /dashboard se já estiver logado e tentar ir para /login
  if (estaLogado && isLoginRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
