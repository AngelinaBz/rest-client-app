export const base64UrlEncode = (str: string): string => {
  const bytes = new TextEncoder().encode(str);
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const base64UrlDecode = (base64?: string | null): string => {
  if (!base64) return '';

  try {
    let padded = base64.replace(/-/g, '+').replace(/_/g, '/');

    while (padded.length % 4) {
      padded += '=';
    }

    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
};
