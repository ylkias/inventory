// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.usuario.upsert({
    where: { usuario: 'admin' },
    update: {}, // não atualiza se já existe
    create: {
      usuario: 'admin',
      senha: 'admin123', // para produção, você deveria usar hash
    },
  })

  console.log(`✅ Usuário criado: ${admin.usuario}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro ao popular o banco:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
