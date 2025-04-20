export const getVariablesAsMapFromCookiesClient = (): Record<
  string,
  string
> => {
  const cookies = document.cookie.split('; ');
  const map: Record<string, string> = {};

  cookies.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    if (key?.startsWith('rest_var_')) {
      map[key.replace('rest_var_', '')] = decodeURIComponent(value || '');
    }
  });

  return map;
};
