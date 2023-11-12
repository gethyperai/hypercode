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

type MethodParamsOptions = {
  contextId: string;
};

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

  async string(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<string>({
      endpointType: 'string',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  async integer(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<number>({
      endpointType: 'integer',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  async float(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<number>({
      endpointType: 'float',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  async boolean(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<boolean>({
      endpointType: 'boolean',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  async datetime(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<string>({
      endpointType: 'datetime',
      query,
      contextId: options?.contextId,
    });

    return data;
  }
}
