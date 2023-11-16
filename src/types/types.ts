import { Hyper } from '../hyper';
import type { AllowedTypes, MethodParamsOptions } from './@types';

export class Types {
  constructor(private readonly hyper: Hyper) {}

  private async makeRequest<T>({
    endpointType,
    query,
    contextId,
  }: {
    endpointType: AllowedTypes;
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

    const res = await this.hyper.post<{ data: T }>({
      endpoint,
      body: payload,
    });

    if (res.data?.data) return { data: res.data.data, error: null };

    return { data: null, error: res.error };
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

  async stringArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<string[]>({
      endpointType: 'string_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  async integerArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<number[]>({
      endpointType: 'integer_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  async floatArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<number[]>({
      endpointType: 'float_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  async booleanArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<boolean[]>({
      endpointType: 'boolean_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  async datetimeArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<string[]>({
      endpointType: 'datetime_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }
}
