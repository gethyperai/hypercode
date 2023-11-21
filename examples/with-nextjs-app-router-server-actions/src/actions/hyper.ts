'use server';

import { hyper } from '@/lib/hyper';

export async function getHyperString(
  prevState: { data: string | null; error: string | null },
  queryData: FormData,
) {
  const query = queryData.get('query') as string;

  if (!query) return { data: '', error: '' };

  const res = await hyper.types.string(query);

  return res;
}
