// Test TypeScript compilation
import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Platform TypeScript compilation test passed',
    timestamp: new Date().toISOString()
  })
}
