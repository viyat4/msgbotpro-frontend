// Authentication utilities for NextAuth
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = 'mongodb+srv://viyat:200801184@jobportol.d0lj8j0.mongodb.net/wbot'

let cachedClient: MongoClient | null = null

async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  cachedClient = client
  return client
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    console.log(`Attempting to authenticate user: ${email}`)
    const client = await connectToDatabase()
    const db = client.db()
    
    // Find user by email
    const user = await db.collection('users').findOne({ email })
    
    if (!user) {
      console.log(`Authentication failed: User not found for email ${email}`)
      return null
    }
    console.log(`User found: ${user.email}, Status: ${user.status}`)

    // Check if account is suspended
    if (user.status === 'suspended') {
      console.log(`Authentication failed: User account ${email} is suspended.`)
      return null
    }

    // Verify password
    console.log(`Verifying password for user ${email}`)
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      console.log(`Authentication failed: Invalid password for user ${email}`)
      return null
    }
    console.log(`Password verified for user ${email}`)

    // Update last login
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    )

    console.log(`Successfully authenticated user: ${email}`)
    // Return user data
    return {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName || user.name?.split(' ')[0] || '',
      lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
      role: user.role || 'user'
    }
  } catch (error) {
    console.error('Authentication error in authenticateUser:', error)
    return null
  }
}

export function generateAccessToken(user: AuthUser): string {
  const secret = process.env.NEXTAUTH_SECRET || 'fallback-secret'
  return jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: '30d' }
  )
}
