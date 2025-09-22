'use server'

import { cookies } from 'next/headers'
import { prisma } from './prisma'

// autenticação real via banco de dados
export async function autenticar(usuario: string, senha: string) {
  const user = await prisma.usuario.findUnique({
    where: { usuario },
  })

  if (!user || user.senha !== senha) {
    return { sucesso: false, erro: 'Usuário ou senha inválidos.' }
  }

  cookies().set('auth', 'logado', {
    httpOnly: true,
    maxAge: 60 * 60 * 2, // 2 horas
  })

  return { sucesso: true }
}

export function isLogado() {
  const cookie = cookies().get('auth')
  return cookie?.value === 'logado'
}

export function logout() {
  cookies().delete('auth')
}
