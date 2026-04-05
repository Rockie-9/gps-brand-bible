import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'gps-auth-token';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.GPS_PORTAL_PASSWORD || 'gps-brand-2026';

    if (password !== correctPassword) {
      return NextResponse.json(
        { error: 'Invalid password / 密碼錯誤' },
        { status: 401 }
      );
    }

    const token = btoa(
      JSON.stringify({
        exp: Date.now() + SESSION_DURATION,
        iat: Date.now(),
      })
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SESSION_DURATION / 1000,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
