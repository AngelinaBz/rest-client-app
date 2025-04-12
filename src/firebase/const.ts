import { FORM } from '@/types/form';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const firebaseAuthAction = {
  [FORM.signIn]: signInWithEmailAndPassword,
  [FORM.signUp]: createUserWithEmailAndPassword,
} as const;

export const firebaseErrors = {
  invalidCredential: 'auth/invalid-credential',
} as const;
