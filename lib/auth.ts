
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
export const { handlers } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { email: { label:'Email', type:'email' }, password: { label:'Password', type:'password' } },
      authorize: async (creds) => {
        const email = creds?.email as string; const password = creds?.password as string
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null
        const ok = await bcrypt.compare(password, user.password)
        if (!ok) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET
})
