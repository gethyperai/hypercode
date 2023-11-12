import { Hyper } from '../hyper';

type allowedTypes =
  | 'string'
  | 'integer'
  | 'float'
  | 'boolean'
  | 'datetime'
  | 'string_array'
  | 'integer_array'
  | 'float_array'
  | 'boolean_array'
  | 'datetime_array';

export class Types {
  constructor(private readonly hyper: Hyper) {}

  private async makeRequest<T>({
    endpointType,
    query,
    contextId,
  }: {
    endpointType: allowedTypes;
    query: string;
    contextId?: string;
  }): Promise<{
    data: T | null;
    error: string | null;
  }> {
    const endpoint = `/types/${endpointType}`;
    const payload = contextId
      ? { query: query, context_id: contextId }
      : { content: query };

    const res = await this.hyper.post<T>({
      endpoint,
      body: payload,
    });

    return res;
  }

  async string(query: string, contextId?: string) {
    const data = await this.makeRequest<string>({
      endpointType: 'string',
      query,
      contextId,
    });

    return data;
  }

  async integer(query: string, contextId?: string) {
    const data = await this.makeRequest<number>({
      endpointType: 'integer',
      query,
      contextId,
    });

    return data;
  }

  async float(query: string, contextId?: string) {
    const data = await this.makeRequest<number>({
      endpointType: 'float',
      query,
      contextId,
    });

    return data;
  }

  async boolean(query: string, contextId?: string) {
    const data = await this.makeRequest<boolean>({
      endpointType: 'boolean',
      query,
      contextId,
    });

    return data;
  }

  async datetime(query: string, contextId?: string) {
    const data = await this.makeRequest<string>({
      endpointType: 'datetime',
      query,
      contextId,
    });

    return data;
  }
}
