// app/api/check-auth/route.ts
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const cookie = cookies().get('auth');
//   const logado = cookie?.value === 'logado';
//   return NextResponse.json({ logado });
// }

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookie = cookies().get('auth');
  const logado = cookie?.value === 'logado';
  return NextResponse.json({ logado });
}
