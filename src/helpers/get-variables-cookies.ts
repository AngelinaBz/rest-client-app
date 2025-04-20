import { cookies } from 'next/headers';
import { EditorItem } from '@/types';

export const getVariablesAsEditorItemsFromCookies = async (): Promise<
  EditorItem[]
> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  return allCookies
    .filter(({ name }) => name.startsWith('rest_var_'))
    .map(({ name, value }) => ({
      key: name.replace('rest_var_', ''),
      value,
    }));
};
