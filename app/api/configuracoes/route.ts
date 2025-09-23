import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    let config = await prisma.configuracoes.findFirst();

    // Se não houver config ainda no banco, retorna valores padrão
    if (!config) {
      config = await prisma.configuracoes.create({
        data: {
          ldapEnabled: false,
          ldapServer: '',
          ldapPort: '389',
          ldapBaseDN: '',
          apiEnabled: false,
          apiKey: '',
          backupEnabled: false,
          backupFrequency: 'weekly',
        },
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json({ error: 'Erro ao carregar configurações' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const config = await prisma.configuracoes.upsert({
      where: { id: 1 },
      update: body,
      create: {
        id: 1, // Força id fixo para sempre ter uma única config
        ...body,
      },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
  }
}
