import { Hyper } from '../hyper';
import type { MethodParamsOptions, SearchResultData } from './@types';

export class Search {
  constructor(private readonly hyper: Hyper) {}

  /**
   * Execute embeddings Search API to perform nuanced searches across integrated third-party data sources and internal documents. More information: https://docs.gethyper.ai/search#post-v1-search
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of embeddings Search API to perform nuanced searches across integrated third-party data sources and internal documents
   * @example
   * const { data, error } = await hyper.search.execute(
        'quarterly sales report',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data);
   */
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
