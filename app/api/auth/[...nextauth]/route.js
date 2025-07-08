// Install next-auth
// npm install next-auth

// Create app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "@/lib/mongodb"
import { compare } from "bcrypt"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase()
        const user = await db.collection("users").findOne({ email: credentials.email })
        
        if (!user) return null
        
        const isPasswordValid = await compare(credentials.password, user.password)
        
        if (!isPasswordValid) return null
        
        return { id: user._id.toString(), name: user.name, email: user.email }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }