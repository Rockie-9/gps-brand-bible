import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'gps-auth-token';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(AUTH_COOKIE);
  if (!cookie) return false;

  try {
    const payload = JSON.parse(atob(cookie.value));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow auth API route, static assets, and Next.js internals
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Allow API routes if authenticated
  if (pathname.startsWith('/api/')) {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Check authentication for all other routes
  if (!isAuthenticated(request)) {
    const loginUrl = new URL('/api/auth/login-page', request.url);
    return NextResponse.rewrite(loginUrl);
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.anthropic.com;"
  );

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
