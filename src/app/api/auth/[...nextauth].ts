import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import EmailProvider from 'next-auth/providers/email'

import prisma from '@/app/lib/prisma'

const EMAIL_SERVER: string | undefined = process.env.EMAIL_SERVER
const EMAIL_FROM: string | undefined = process.env.EMAIL_FROM
const NEXTAUTH_SECRET: string | undefined = process.env.NEXTAUTH_SECRET

if (!EMAIL_SERVER || !EMAIL_FROM || !NEXTAUTH_SECRET) {
  throw new Error('Missing environment variables')
}

const emailProviderOptions = {
  server: EMAIL_SERVER,
  from: EMAIL_FROM,
}

const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [EmailProvider(emailProviderOptions)],
  secret: NEXTAUTH_SECRET,
}

export default NextAuth(nextAuthOptions)
