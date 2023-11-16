export type AllowedTypes =
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

export type MethodParamsOptions = {
  /**
   * The context ID to be used for the request, you can get all context IDs by calling `hyper.contexts.list()` and then using the `id` field from the response.
   */
  contextId: string;
};
