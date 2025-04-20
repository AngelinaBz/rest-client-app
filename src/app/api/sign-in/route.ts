import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/../firebase.config';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/form';
import { firebaseErrors } from '@/firebase/const';
import { UserResponse } from '@/types/firebase';
import { getTranslations } from 'next-intl/server';
import { FirebaseError } from 'firebase/app';
import saveUserSession from '@/firebase/save-user-session';

export const POST = async (
  request: NextRequest
): Promise<NextResponse<UserResponse>> => {
  const t = await getTranslations('Form.message');

  try {
    const { email, password }: User = await request.json();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await saveUserSession(userCredential);

    return NextResponse.json({ isUser: true, message: '' });
  } catch (error) {
    let message = t('somethingWrong');

    if (error instanceof FirebaseError) {
      if (error.code === firebaseErrors.invalidCredential)
        message = t('invalidCredential');
    }

    return NextResponse.json({ isUser: false, message });
  }
};
