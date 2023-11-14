import { Hyper } from '../hyper';
import type { MethodParamsOptions, SearchResultData } from './@types';

export class Search {
  constructor(private readonly hyper: Hyper) {}

  async execute(query: string, options?: MethodParamsOptions) {
    const payload = options?.contextId
      ? { query, context_id: options.contextId }
      : { query };

    const res = await this.hyper.post<SearchResultData[]>({
      endpoint: '/search',
      body: payload,
    });

    return res;
  }
}
