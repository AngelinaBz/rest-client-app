import { COOKIE_SESSION_KEY } from '@/firebase/const';
import { cookies } from 'next/headers';
import { auth } from '@/../firebase.config';
import { signOut } from 'firebase/auth';
import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    signOut(auth);
    (await cookies()).delete(COOKIE_SESSION_KEY);
    return NextResponse.json({ isUser: false });
  } catch {
    return NextResponse.json({ isUser: true });
  }
};
