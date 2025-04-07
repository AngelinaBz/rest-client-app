import { useTranslations } from 'next-intl';

const MIN_PASS_LENGTH = 8;

const getPasswordErrorMessage = (
  pass: string,
  t: ReturnType<typeof useTranslations<'Validation'>>
): string => {
  const charErrors: string[] = [];

  const upperCaseLetters = /^[\S]{0,}\p{Lu}{1}[\S]{0,}$/u.exec(pass);
  if (!upperCaseLetters) charErrors.push(t('password.uppercaseLetter'));

  const lowerCaseLetters = /^[\S]{0,}\p{Ll}{1}[\S]{0,}$/u.exec(pass);
  if (!lowerCaseLetters) charErrors.push(t('password.lowercaseLetter'));

  const digits = /^[\S]{0,}[0-9]{1}[\S]{0,}$/.exec(pass);
  if (!digits) charErrors.push(t('password.digit'));

  const specialChars = /^[\S]{0,}[\p{P}\p{S}]{1}[\S]{0,}$/u.exec(pass);
  if (!specialChars) charErrors.push(t('password.specialChar'));

  const charErrorsMessage = charErrors.length
    ? `${t('password.charError')} ${charErrors.join(', ')}.`
    : '';

  const lengthError =
    pass.length < MIN_PASS_LENGTH
      ? t('password.minLength', { length: MIN_PASS_LENGTH })
      : '';

  return charErrors.length || lengthError
    ? `${charErrorsMessage} ${lengthError}`
    : '';
};

export default getPasswordErrorMessage;
