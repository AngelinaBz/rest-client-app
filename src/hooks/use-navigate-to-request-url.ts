import { useRouter } from '@/i18n/navigation';
import { RequestParams } from '@/types';
import { Routes } from '@/types/routes';
import { base64UrlEncode } from '@/utils/code64';

export const useNavigateToRequestURL = () => {
  const router = useRouter();

  return (request: RequestParams) => {
    const { method, url, headers, body } = request;

    const headerParams = headers.reduce(
      (acc, { key, value }) => {
        if (key.trim()) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    let encodedBody: string | undefined;
    try {
      const parsed = JSON.parse(body);
      const normalized = JSON.stringify(parsed);
      encodedBody = base64UrlEncode(normalized);
    } catch {
      encodedBody = body ? base64UrlEncode(body) : undefined;
    }

    const newPath = Routes.RESTFUL_CLIENT_REQUEST(
      method,
      base64UrlEncode(url),
      encodedBody,
      headerParams
    );

    router.replace(newPath, { scroll: false });
  };
};
