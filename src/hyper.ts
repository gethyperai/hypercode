import { Types } from './types';
import { Search } from './search';
import { Contexts } from './contexts';

const baseUrl = process.env.HYPER_BASE_URL || 'https://api.gethyper.ai/v1';

/**
 * Hyper API client.
 * @param {string} apiKey - Your Hyper API key. Generate one at https://app.gethyper.ai/settings/api-keys, save it in a `.env` file, and pass it to the constructor like `new Hyper(process.env.HYPER_API_KEY)`.
 * @example
 * import { Hyper } from 'hypercode';
 * import dotenv from "dotenv";
 *
 * dotenv.config();
 *
 * const hyper = new Hyper(process.env.HYPER_API_KEY);
 */
export class Hyper {
  private readonly headers: Headers;

  /**
   * Hyper Types API. The `types` feature of the Developer API empowers you to retrieve structured data that is validated against specific data types. With the addition of a `contextId`, the API provides live, context-aware responses. More information: https://docs.gethyper.ai/types
   * @example
   * const { data, error } = await hyper.types.string('Who is the CEO of SpaceX?');
   * console.log(data); // Elon Musk
   * @example
   * const { data, error } = await hyper.types.integer(
        'How many planets are in the Solar System?',
        { contextId: 'context-456' },
      );
   * console.log(data); // 8
   */
  readonly types = new Types(this);

  /**
   * Hyper Search API. Utilize our Embeddings Search API to perform nuanced searches across integrated third-party data sources and internal documents. Leverage the `contextId` to scope searches to specific business contexts for enhanced relevance. More information: https://docs.gethyper.ai/search
   * @example
   * const { data, error } = await hyper.search.execute('quarterly sales report', {
        contextId: 'context-123',
      });
   */
  readonly search = new Search(this);

  /**
   * Hyper Contexts API. Context groups in the Hyper app serve as collections of data aggregated from files, web URLs, and third-party integrations. They play a crucial role in refining search results and tailoring the contextual data provided to large language models. More information: https://docs.gethyper.ai/context
   * @example
   * const { data, error } = await hyper.contexts.all();
   */
  readonly contexts = new Contexts(this);

  /**
   *
   * @param {string} apiKey - Your Hyper API key. Generate one at https://app.gethyper.ai/settings/api-keys, save it in a `.env` file, and pass it to the constructor like `new Hyper(process.env.HYPER_API_KEY)`.
   * @example
   * import { Hyper } from 'hypercode';
   * import dotenv from "dotenv";
   *
   * dotenv.config();
   *
   * const hyper = new Hyper(process.env.HYPER_API_KEY);
   */
  constructor(private readonly apiKey?: string) {
    if (!apiKey) {
      this.apiKey = process.env.HYPER_API_KEY;

      if (!this.apiKey) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new Hyper("hyper_123...")` or set the HYPER_API_KEY environment variable.',
        );
      }
    }

    this.headers = new Headers({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });
  }

  private async fetchRequest<T>({
    endpoint,
    options = {},
  }: {
    endpoint: string;
    options?: RequestInit;
  }): Promise<
    | {
        data: T;
        error: null;
      }
    | {
        data: null;
        error: string;
      }
  > {
    const res = await fetch(`${baseUrl}${endpoint}`, options);

    if (!res.ok) {
      const { error } = (await res.json()) as { error: string };

      return { data: null, error };
    }

    const data = (await res.json()) as T;
    return { data, error: null };
  }

  async post<T>({
    endpoint,
    body,
    options = {},
  }: {
    endpoint: string;
    body: unknown;
    options?: RequestInit;
  }) {
    const requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
      ...options,
    };

    return this.fetchRequest<T>({ endpoint, options: requestOptions });
  }

  async get<T>({
    endpoint,
    options = {},
  }: {
    endpoint: string;
    options?: RequestInit;
  }) {
    const requestOptions = {
      method: 'GET',
      headers: this.headers,
      ...options,
    };

    return this.fetchRequest<T>({ endpoint, options: requestOptions });
  }
}
