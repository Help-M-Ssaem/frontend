import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_APP_GOOGLE_API_KEY || '',
      clientSecret: process.env.NEXT_PUBLIC_APP_GOOGLE_SECRET_KEY || '',
    }),
  ],
})

export { handler as GET, handler as POST }
