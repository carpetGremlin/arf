import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define paths that don't require authentication
const PUBLIC_PATHS = [
  '/',                 // Landing page
  '/login',            // Login page
  '/api/auth',         // Auth API routes
  '/api/webhook',      // Webhook API routes
];

// Function to check if the path is public
function isPublicPath(path: string): boolean {
  return PUBLIC_PATHS.some(publicPath => {
    // Exact match
    if (publicPath === path) return true;
    // Path starts with public path followed by /
    if (path.startsWith(`${publicPath}/`)) return true;
    return false;
  }) || 
  // Check for static files
  path.match(/\.(ico|png|jpg|jpeg|svg|css|js|json)$/i) !== null;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow public paths without authentication check
  if (isPublicPath(path)) {
    return NextResponse.next();
  }

  // Check for Privy auth cookie
  const authCookie = request.cookies.get('privy-token');
  
  // If no auth cookie is present and the path requires auth, redirect to landing page
  if (!authCookie) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }

  // Continue with the request if authenticated
  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|.*\\.png$).*)',
  ],
};
