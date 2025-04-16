import { NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth-helpers';

/**
 * Protected API route example that requires authentication
 */
export async function GET() {
  try {
    // This will redirect to / if not authenticated
    const session = await getAuthenticatedSession();
    
    // If we get here, the user is authenticated
    return NextResponse.json({
      success: true,
      message: 'Authenticated API route working',
      user: {
        id: session.user.id,
        // Don't expose full wallet data
        wallet: session.wallet ? {
          address: session.wallet.address,
        } : null,
      }
    });
  } catch (error) {
    // The getAuthenticatedSession function handles redirects for unauthenticated users,
    // but we should handle other errors
    console.error('API route error:', error);
    
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 