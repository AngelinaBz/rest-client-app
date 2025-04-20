import * as Yup from 'yup';
import { FORM, FormType, USER } from '@/types/form';
import { useTranslations } from 'next-intl';
import getPasswordErrorMessage from './get-password-error-message';

const getValidationSchema = (
  t: ReturnType<typeof useTranslations<'Validation'>>,
  formType: FormType
) => {
  const userSchema = Yup.object().shape({
    [USER.email]: Yup.string()
      .required(t('email.required'))
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, t('email.valid')),
    [USER.password]:
      formType === FORM.signIn
        ? Yup.string().required(t('password.required'))
        : Yup.string()
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
