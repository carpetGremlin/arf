import { redirect } from 'next/navigation';
import { getServerSession } from '@privy-io/server-auth';
import type { User } from '@privy-io/react-auth';

interface PrivySession {
  user: User;
  wallet?: {
    address: string;
    chainId: string;
  };
}

/**
 * Fetch user's Privy session server-side and redirect if not authenticated
 */
export async function getAuthenticatedSession(): Promise<PrivySession> {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const privyAppSecret = process.env.PRIVY_APP_SECRET;
  
  if (!privyAppId || !privyAppSecret) {
    throw new Error('Missing Privy credentials in environment variables');
  }
  
  // Get session using Privy server-side auth
  try {
    const session = await getServerSession({
      appId: privyAppId,
      appSecret: privyAppSecret,
    });
    
    if (!session) {
      redirect('/'); // Redirect to landing page if no session
    }
    
    return session;
  } catch (error) {
    console.error('Failed to get user session:', error);
    redirect('/'); // Redirect to landing page on error
  }
}

/**
 * Check if user has required roles/access
 * Can be expanded as needed 
 */
export function checkUserAccess(user: User, requiredAccess?: string[]): boolean {
  // Default to true if no specific access is required
  if (!requiredAccess || requiredAccess.length === 0) {
    return true;
  }
  
  // Example: Check if user has required access based on wallets/data
  // This is just a placeholder - implement your specific logic
  const userWallets = user.wallet?.addresses || [];
  
  // Basic implementation - can be expanded for specific wallet checks,
  // role-based access, or subscription status checks
  return Boolean(user && userWallets.length > 0);
}

/**
 * Safely encrypt sensitive data - simplistic example
 * In production, consider using a dedicated encryption library
 */
export function encryptSensitiveData(data: string): string {
  // This is just a placeholder - use a proper encryption library in production
  // For example: crypto-js, node-forge, or other secure libraries
  return Buffer.from(data).toString('base64');
}

/**
 * Decrypt sensitive data - simplistic example
 */
export function decryptSensitiveData(encryptedData: string): string {
  // This is just a placeholder - use a proper decryption function in production
  return Buffer.from(encryptedData, 'base64').toString();
} 