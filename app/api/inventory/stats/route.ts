import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalEquipamentos: 0,
    ativos: 0,
    pendentes: 0,
  });
}
