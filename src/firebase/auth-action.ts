import { FormType, User } from '@/types/form';
import { firebaseAuthAction, firebaseErrors } from './const';
import { auth } from '@/../firebaseConfig';
import { UserCredential } from 'firebase/auth';
import { useTranslations } from 'next-intl';

const authAction = async (
  formType: FormType,
  { email, password }: User,
  t: ReturnType<typeof useTranslations<'Form.message'>>
): Promise<{ isUser: boolean; message: string }> => {
  let isUser = false;
  let message = '';

  await firebaseAuthAction[formType](auth, email, password)
    .then((userCredentials: UserCredential) => {
      const user = userCredentials.user;
      if (user) isUser = true;
    })
    .catch((error) => {
      if (
        error instanceof Error &&
        error.message.includes(firebaseErrors.invalidCredential)
      )
        message = t('invalidCredential');
      else message = t('somethingWrong');
    });

  return { isUser, message };
};

export default authAction;
