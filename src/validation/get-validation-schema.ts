import * as Yup from 'yup';
import { USER } from '@/types/form';
import { useTranslations } from 'next-intl';
import getPasswordErrorMessage from './get-password-error-message';

const getValidationSchema = (
  t: ReturnType<typeof useTranslations<'Validation'>>
) => {
  const userSchema = Yup.object().shape({
    [USER.email]: Yup.string()
      .required(t('email.required'))
      .email(t('email.valid')),
    [USER.password]: Yup.string()
      .required(t('password.required'))
      .test({
        name: '',
        test: function (pass) {
          const errorMessage = getPasswordErrorMessage(pass, t);

          return errorMessage
            ? this.createError({
                message: errorMessage,
                path: USER.password,
              })
            : true;
        },
      }),
  });

  return userSchema;
};

export default getValidationSchema;
