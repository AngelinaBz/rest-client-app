import { COOKIE_SESSION_KEY } from '@/firebase/const';
import { AuthStatus } from '@/types/firebase';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse<AuthStatus>> => {
  const session = (await cookies()).get(COOKIE_SESSION_KEY);

  if (session) return NextResponse.json({ isSessionActive: true });

  return NextResponse.json({ isSessionActive: false });
};
