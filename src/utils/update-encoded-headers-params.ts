import { EditorItem } from '@/types';

export const updateURLWithHeaders = (headers: EditorItem[]) => {
  const currentUrl = new URL(window.location.href);

  const currentHeaderKeys = Array.from(currentUrl.searchParams.keys()).map(
    (key) => decodeURIComponent(key)
  );

  const newHeaderKeys = headers
    .map((header) => header.key.trim())
    .filter(Boolean);

  currentHeaderKeys.forEach((key) => {
    if (!newHeaderKeys.includes(key)) {
      currentUrl.searchParams.delete(encodeURIComponent(key));
    }
  });

  headers.forEach(({ key, value }) => {
    if (key.trim()) {
      currentUrl.searchParams.set(encodeURIComponent(key), value);
    }
  });

  window.history.replaceState({}, '', currentUrl.toString());
};
