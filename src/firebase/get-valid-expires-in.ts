const MIN_EXPIRES_IN = 5 * 60 * 1000;
const MAX_EXPIRES_IN = 14 * 24 * 60 * 60 * 1000;
const DEFAULT_EXPIRES_IN = 60 * 60 * 1000;

const getValidExpiresIn = (): number => {
  const envExpiresIn: string | undefined =
    process.env.NEXT_PUBLIC_SESSION_EXPIRES_IN;

  if (typeof envExpiresIn !== 'string') return DEFAULT_EXPIRES_IN;

  const envExpiresInNum: number = parseInt(envExpiresIn);

  if (isNaN(envExpiresInNum)) return DEFAULT_EXPIRES_IN;

  const expiresIn =
    envExpiresInNum >= MIN_EXPIRES_IN && envExpiresInNum <= MAX_EXPIRES_IN
      ? envExpiresInNum
      : DEFAULT_EXPIRES_IN;

  return expiresIn;
};

export default getValidExpiresIn;
