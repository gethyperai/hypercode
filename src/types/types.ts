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
    const endpoint = `/types/${endpointType}`;
    const payload = contextId
      ? { query: query, context_id: contextId }
      : { content: query };

    const res = await this.hyper.post<{ data: T }>({
      endpoint,
      body: payload,
    });

    if (res.data) return { data: res.data.data, error: null };

    return { data: null, error: res.error };
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as a string data type
   * @example
   * const { data, error } = await hyper.types.string(
        'Who is the CEO of SpaceX?',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // Elon Musk
   */
  async string(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<string>({
      endpointType: 'string',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as an integer data type
   * @example
   * const { data, error } = await hyper.types.integer(
        'How many planets are in the Solar System?',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // 8
   */
  async integer(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<number>({
      endpointType: 'integer',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as a float data type
   * @example
   * const { data, error } = await hyper.types.float(
        'How many billion years old is the universe?',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // 13.8
   */
  async float(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<number>({
      endpointType: 'float',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as a boolean data type
   * @example
   * const { data, error } = await hyper.types.boolean(
        'Can cats see in the dark?',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // true
   */
  async boolean(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<boolean>({
      endpointType: 'boolean',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as a datetime data type
   * @example
   * const { data, error } = await hyper.types.datetime(
        'What is the date of the Apollo 11 moon landing?',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // '1969-07-20T20:17:00Z'
   */
  async datetime(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<string>({
      endpointType: 'datetime',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as a array of strings
   * @example
   * const { data, error } = await hyper.types.stringArray(
        'List all department names',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // ['Human Resources', 'Finance', 'Research and Development', 'Sales', 'Customer Support']
   */
  async stringArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<string[]>({
      endpointType: 'string_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as a array of integers
   * @example
   * const { data, error } = await hyper.types.integerArray(
        'What is the headcount for each department?',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // [25, 40, 15, 50, 30]
   */
  async integerArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<number[]>({
      endpointType: 'integer_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as a array of floats
   * @example
   * const { data, error } = await hyper.types.floatArray(
        'What were the customer satisfaction ratings from the last survey?',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // [4.2, 3.8, 4.5, 4.7, 3.9]
   */
  async floatArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<number[]>({
      endpointType: 'float_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as a array of booleans
   * @example
   * const { data, error } = await hyper.types.booleanArray(
        'Are services meeting performance targets?',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // [true, false, true, true, false]
   */
  async booleanArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<boolean[]>({
      endpointType: 'boolean_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }

  /**
   *
   * @param {string} query - The query to be processed
   * @param {MethodParamsOptions} options - Optional parameters to be passed to the request, such as `contextId`
   * @returns The result of the query as a array of datetime strings
   * @example
   * const { data, error } = await hyper.types.datetimeArray(
        'What are the upcoming project deadlines?',
        { contextId: '123e4567-e89b-12d3-a456-426614174000' },
     );
   * console.log(data); // ['2023-11-15T17:00:00Z', '2023-12-01T17:00:00Z', '2023-12-20T17:00:00Z']
   */
  async datetimeArray(query: string, options?: MethodParamsOptions) {
    const data = await this.makeRequest<string[]>({
      endpointType: 'datetime_array',
      query,
      contextId: options?.contextId,
    });

    return data;
  }
}
