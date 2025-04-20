import { HttpMethod } from '@/types';

export const replaceMethodInURL = (newMethod: HttpMethod) => {
  const { pathname, search, hash } = window.location;

  const segments = pathname.split('/').filter(Boolean);
  const localeIndex = 0;
  const restClientIndex = 1;
  const methodIndex = 2;

  if (
    segments[localeIndex] &&
    segments[restClientIndex] === 'restful-client' &&
    segments[methodIndex]
  ) {
    segments[methodIndex] = newMethod;

    const newPath = '/' + segments.join('/');
    const newURL = `${newPath}${search}${hash}`;

    window.history.replaceState(null, '', newURL);
  }
};
