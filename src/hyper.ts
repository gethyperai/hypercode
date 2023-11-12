import { Types } from './types';

const baseUrl = process.env.HYPER_BASE_URL || 'https://api.gethyper.ai/v1';

/**
 * Hyper API client.
 * @param {string} apiKey - Your Hyper API key.
 * @example
 * const hyper = new Hyper('hyper_123...');
 */
export class Hyper {
  private readonly headers: Headers;

  readonly types = new Types(this);

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
  }): Promise<{ data: T | null; error: string | null }> {
    const res = await fetch(`${baseUrl}${endpoint}`, options);

    if (!res.ok) {
      const { error } = (await res.json()) as { error: string };

      return { data: null, error };
    }

    const { data } = (await res.json()) as { data: T };
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
