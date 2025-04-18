import React from 'react';
import { PageWrapper } from '@/components/page-wrapper';
import { LazyClientComponent } from '@/components/restful-client-component';
import { redirect } from '@/i18n/navigation';
import { HTTP_METHODS, HttpMethod, RequestParams } from '@/types';
import { Routes } from '@/types/routes';
import { getResponse } from '@/helpers/get-response';
import { base64UrlDecode } from '@/utils/code64';
import { Locale } from 'next-intl';
import { prepareRequestData } from '@/utils/prepare-request';
import { getVariablesAsEditorItemsFromCookies } from '@/helpers/get-variables-cookies';

type PageProps = {
  params: Promise<{ locale: Locale; method: HttpMethod; rest?: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] }>;
};

export default async function RestClientPage({
  params,
  searchParams,
}: PageProps) {
  const { locale, method, rest } = await params;
  const resolvedSearchParams = await searchParams;

  const [encodedUrl, encodedBody] = rest ?? [];
  const decodedUrl = encodedUrl ? base64UrlDecode(encodedUrl) : '';
  const decodedBody = encodedBody ? base64UrlDecode(encodedBody) : '';

  if (!HTTP_METHODS.includes(method)) {
    redirect({
      href: Routes.NOT_FOUND,
      locale,
    });
  }

  const headers = resolvedSearchParams
    ? Object.entries(resolvedSearchParams)
        .filter(([key]) => key !== 'body')
        .map(([key, value]) => ({
          key,
          value: Array.isArray(value) ? value[0] : value,
        }))
    : [];

  const requestParams: RequestParams = {
    method,
    url: decodedUrl,
    body: decodedBody,
    headers,
  };

  const variableItems = await getVariablesAsEditorItemsFromCookies();

  const response = decodedUrl
    ? await getResponse(prepareRequestData(requestParams, variableItems))
    : null;

  return (
    <PageWrapper>
      <LazyClientComponent response={response} request={requestParams} />
    </PageWrapper>
  );
}
