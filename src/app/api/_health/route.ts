import { NextResponse } from 'next/server';
import { checkRequiredEnvVars, isProduction } from '@/lib/env';

/**
 * Health check endpoint that verifies the app is properly configured
 * This can be used by monitoring tools to check application health
 */
export async function GET() {
  try {
    // Required environment variables for the application to function
    const requiredVars = [
      'NEXT_PUBLIC_PRIVY_APP_ID',
      'PRIVY_APP_SECRET',
      'WALLET_ENCRYPTION_KEY',
      'DATABASE_URL',
      'DIRECT_URL',
    ];
    
    // Required only in production (optional in development)
    const productionRequiredVars = [
      'OPENAI_API_KEY',
      'HELIUS_API_KEY',
      'NEXT_PUBLIC_HELIUS_RPC_URL',
    ];
    
    // Check required variables in all environments
    checkRequiredEnvVars(requiredVars);
    
    // Check production-only variables if in production
    if (isProduction()) {
      checkRequiredEnvVars(productionRequiredVars);
    }
    
    // If we get here, all required environment variables are set
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    // Log the error (but don't expose sensitive details in the response)
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 