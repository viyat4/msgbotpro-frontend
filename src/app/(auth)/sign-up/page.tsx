'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSignUpSchema, type SignUpForm } from '@/lib/validationSchemas' // Updated import
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { authAPI } from '@/lib/api'
import Link from 'next/link'
import { useNetworkDebugger } from '@/lib/networkDebugger'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  
  // Add network debugger in development
  if (process.env.NODE_ENV === 'development') {
    useNetworkDebugger()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },  } = useForm<SignUpForm>({
    resolver: zodResolver(clientSignUpSchema), // Use clientSignUpSchema
  })
  
  const onSubmit = async (data: SignUpForm) => {
    try {
      setIsLoading(true)
      
      const nameParts = data.name.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      
      // Create payload explicitly with all required fields
      const registrationPayload = {
        firstName: firstName,
        lastName: lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword, // Ensure this is included
        // Only include phone number if it has a value and is in E.164 format
        phoneNumber: data.phoneNumber && /^\+[1-9]\d{7,14}$/.test(data.phoneNumber) 
          ? data.phoneNumber 
          : undefined
      };
      
      console.log("Registration payload:", registrationPayload); // Debug payload
      
      // Additional debug logging
      console.group('⭐️ Registration Request Debug');
      console.log('Form data:', data);
      console.log('Transformed payload:', registrationPayload);
      console.groupEnd();
      
      // Use direct axios call for better debugging
      try {
        console.log('Registration request headers:', {
          'Content-Type': 'application/json',
          'Accept': 'application/json'  
        });
        
        const response = await authAPI.register(registrationPayload);
        console.log('Registration success response:', response.data);
      } catch (apiError: any) {
        console.error('Registration API error:', apiError);
        console.error('Error status:', apiError.response?.status);
        console.error('Error response:', apiError.response?.data);
        console.error('Error headers:', apiError.response?.headers);
        
        // Additional debug info for network issues
        if (!apiError.response) {
          console.error('Network error - no response received');
        }
        
        throw apiError; // Re-throw to be caught by the outer try/catch
      }

      toast({
        title: 'Success',
        description: 'Account created successfully! Please sign in.',
      })
      
      router.push('/sign-in')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Get started with WhatsApp SaaS Platform
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                required
                {...register('name')}
                className="mt-1"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
              <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register('email')}
                className="mt-1"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone number (optional)</Label>
              <Input
                id="phoneNumber"
                type="tel"
                autoComplete="tel"
                placeholder="+12125551234"
                {...register('phoneNumber')}
                className="mt-1"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                {...register('password')}
                className="mt-1"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                {...register('confirmPassword')}
                className="mt-1"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/sign-in" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
