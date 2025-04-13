import { UserCredential } from 'firebase/auth';
import { authAdmin } from '../../firebase-admin.config';
import { cookies } from 'next/headers';
import { COOKIE_SESSION_KEY } from './const';

const expiresIn = 3600000;

const saveUserSession = async (userCredential: UserCredential) => {
  const { user } = userCredential;

  const token = await user.getIdToken();

  const session = await authAdmin.createSessionCookie(token, { expiresIn });
  (await cookies()).set(COOKIE_SESSION_KEY, session, {});
};

export default saveUserSession;
