import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { RESTFUL_CLIENT, Routes } from './types/routes';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_SESSION_KEY } from './firebase/const';

const intlMiddleware = createMiddleware(routing);

const PROTECTED_ROUTES = [RESTFUL_CLIENT, Routes.HISTORY, Routes.VARIABLES];
const AUTH_ROUTES = [Routes.SIGN_IN, Routes.SIGN_UP];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { url } = request;

  const token = (await cookies()).get(COOKIE_SESSION_KEY);

  if (!token && PROTECTED_ROUTES.some((route) => url.includes(route))) {
    return NextResponse.redirect(new URL(Routes.MAIN, url));
  }

  if (token && AUTH_ROUTES.some((route) => url.includes(route))) {
    return NextResponse.redirect(new URL(Routes.MAIN, url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
};
