export const updateEncodedUrlInPath = (newUrl: string) => {
  const url = new URL(window.location.href);

  const pathSegments = url.pathname.split('/').filter(Boolean);

  const locale = pathSegments[0];
  const basePath = pathSegments[1];
  const method = pathSegments[2];
  const body = pathSegments[4];
  const headers = url.search;

  const encodedUrl = btoa(newUrl);

  const newPath = `/${locale}/${basePath}/${method}/${encodedUrl}${body ? `/${body}` : ''}`;

  window.history.replaceState(null, '', newPath + headers);
};
