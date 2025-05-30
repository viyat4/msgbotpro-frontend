import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/sign-in')
  }
  
  // Redirect authenticated users to dashboard
  redirect('/dashboard')
}
