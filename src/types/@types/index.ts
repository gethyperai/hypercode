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
  contextId: string;
};
