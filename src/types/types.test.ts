import { enableFetchMocks } from 'jest-fetch-mock';
import { Hyper } from '../index';
import type { AllowedTypes } from './@types';

enableFetchMocks();

const baseUrl = process.env.HYPER_BASE_URL || 'https://api.gethyper.ai/v1';
const endpoint = '/types';
const fullEndpoint = (type: AllowedTypes) => `${baseUrl}${endpoint}/${type}`;

const hyper = new Hyper('hyper_1234');

describe('Hypercode Types API methods', () => {
  afterEach(() => fetchMock.resetMocks());

  describe("makeRequest method's error handling", () => {
    it('should return error if response is not ok', async () => {
      fetchMock.mockOnce(JSON.stringify({ error: 'Not found' }), {
        status: 404,
      });

      const result = await hyper['types']['makeRequest']({
        endpointType: 'string',
        query: 'Who is the CEO of SpaceX?',
      });

      expect(result).toEqual({ data: null, error: 'Not found' });
    });
  });

  describe('string method', () => {
    it('should return the correct string for an identification query', async () => {
      fetchMock.mockOnce(JSON.stringify({ data: 'Elon Musk' }), {
        status: 200,
      });

      const result = await hyper.types.string('Who is the CEO of SpaceX?');

      expect(typeof result.data).toBe('string');
      expect(result.data).toBe('Elon Musk');
    });

    it('should return the correct string for an identification query with contextId', async () => {
      const contextId = 'context-123';

      fetchMock.mockOnce(JSON.stringify({ data: 'Elon Musk' }), {
        status: 200,
      });

      const result = await hyper.types.string('Who is the CEO of SpaceX?', {
        contextId,
      });

      expect(typeof result.data).toBe('string');
      expect(result.data).toBe('Elon Musk');
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('string'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'Who is the CEO of SpaceX?',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });

  describe('integer method', () => {
    it('should return correct integer for a count query', async () => {
      fetchMock.mockOnce(JSON.stringify({ data: 42 }), {
        status: 200,
      });

      const result = await hyper.types.integer(
        'How many planets are in the Solar System?',
      );

      expect(typeof result.data).toBe('number');
      expect(result.data).toBe(42);
    });

    it('should return correct integer for a count query with contextId', async () => {
      const contextId = 'context-456';

      fetchMock.mockOnce(JSON.stringify({ data: 42 }), {
        status: 200,
      });

      const result = await hyper.types.integer(
        'How many planets are in the Solar System?',
        { contextId },
      );

      expect(typeof result.data).toBe('number');
      expect(result.data).toBe(42);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('integer'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'How many planets are in the Solar System?',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });

  describe('float method', () => {
    it('should return the correct float value for a quantitative query', async () => {
      const fixedStatistic = 13.8; // Age of the universe in billion years

      fetchMock.mockOnce(JSON.stringify({ data: fixedStatistic }), {
        status: 200,
      });

      const result = await hyper.types.float(
        'How many billion years old is the universe?',
      );

      expect(typeof result.data).toBe('number');
      expect(result.data).toBe(fixedStatistic);
    });

    it('should return the correct float value for a quantitative query with contextId', async () => {
      const contextId = 'context-789';
      const fixedStatistic = 13.8; // Age of the universe in billion years

      fetchMock.mockOnce(JSON.stringify({ data: fixedStatistic }), {
        status: 200,
      });

      const result = await hyper.types.float(
        'How many billion years old is the universe?',
        { contextId },
      );

      expect(typeof result.data).toBe('number');
      expect(result.data).toBe(fixedStatistic);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('float'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'How many billion years old is the universe?',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });

  describe('boolean method', () => {
    it('should return the correct boolean value for a boolean query', async () => {
      fetchMock.mockOnce(JSON.stringify({ data: true }), {
        status: 200,
      });

      const result = await hyper.types.boolean('Can cats see in the dark?');

      expect(typeof result.data).toBe('boolean');
      expect(result.data).toBe(true);
    });

    it('should return the correct boolean value for a boolean query with contextId', async () => {
      const contextId = 'context-abc';

      fetchMock.mockOnce(JSON.stringify({ data: true }), {
        status: 200,
      });

      const result = await hyper.types.boolean('Can cats see in the dark?', {
        contextId,
      });

      expect(typeof result.data).toBe('boolean');
      expect(result.data).toBe(true);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('boolean'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'Can cats see in the dark?',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });

  describe('datetime method', () => {
    it('should return the correct datetime value for a datetime query', async () => {
      fetchMock.mockOnce(JSON.stringify({ data: '1969-07-20T20:17:00Z' }), {
        status: 200,
      });

      const { data } = await hyper.types.datetime(
        'What is the date of the Apollo 11 moon landing?',
      );

      expect(typeof data).toBe('string');
      expect(data).toBe('1969-07-20T20:17:00Z');
      expect(new Date(data!)).toBeInstanceOf(Date);
      expect(new Date(data!).getFullYear()).toBe(1969);
    });

    it('should return the correct datetime value for a datetime query with contextId', async () => {
      const contextId = 'context-def';

      fetchMock.mockOnce(JSON.stringify({ data: '1969-07-20T20:17:00Z' }), {
        status: 200,
      });

      const { data } = await hyper.types.datetime(
        'What is the date of the Apollo 11 moon landing?',
        { contextId },
      );

      expect(typeof data).toBe('string');
      expect(data).toBe('1969-07-20T20:17:00Z');
      expect(new Date(data!)).toBeInstanceOf(Date);
      expect(new Date(data!).getFullYear()).toBe(1969);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('datetime'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'What is the date of the Apollo 11 moon landing?',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });

  describe('stringArray method', () => {
    const expectedResult = [
      'Human Resources',
      'Finance',
      'Research and Development',
      'Sales',
      'Customer Support',
    ];

    it('should return the correct string array for a string array query', async () => {
      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.stringArray(
        'List all department names',
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('string');
      expect(data).toEqual(expectedResult);
    });

    it('should return the correct string array for a string array query with contextId', async () => {
      const contextId = '9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4';

      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.stringArray(
        'List all department names',
        { contextId },
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('string');
      expect(data).toEqual(expectedResult);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('string_array'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'List all department names',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });

  describe('integerArray method', () => {
    const expectedResult = [25, 40, 15, 50, 30];

    it('should return the correct integer array for a integer array query', async () => {
      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.integerArray(
        'What is the headcount for each department?',
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('number');
      expect(data).toEqual(expectedResult);
    });

    it('should return the correct integer array for a integer array query with contextId', async () => {
      const contextId = 'a1b2c3d4-e5f6-4g7h-8i9j-0k1l2m3n4o5p';

      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.integerArray(
        'What is the headcount for each department?',
        { contextId },
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('number');
      expect(data).toEqual(expectedResult);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('integer_array'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'What is the headcount for each department?',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });

  describe('floatArray method', () => {
    const expectedResult = [4.2, 3.8, 4.5, 4.7, 3.9];

    it('should return the correct float array for a float array query', async () => {
      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.floatArray(
        'What were the customer satisfaction ratings from the last survey?',
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('number');
      expect(data).toEqual(expectedResult);
    });

    it('should return the correct float array for a float array query with contextId', async () => {
      const contextId = '0f9e8d7c-6b5a-4c3d-2e1f-0a9b8c7d6e5f';

      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.floatArray(
        'What were the customer satisfaction ratings from the last survey?',
        { contextId },
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('number');
      expect(data).toEqual(expectedResult);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('float_array'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query:
                'What were the customer satisfaction ratings from the last survey?',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });

  describe('booleanArray method', () => {
    const expectedResult = [true, false, true, true, false];

    it('should return the correct boolean array for a boolean array query', async () => {
      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.booleanArray(
        'Are services meeting performance targets?',
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('boolean');
      expect(data).toEqual(expectedResult);
    });

    it('should return the correct boolean array for a boolean array query with contextId', async () => {
      const contextId = '5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8g9h0i';

      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.booleanArray(
        'Are services meeting performance targets?',
        { contextId },
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('boolean');
      expect(data).toEqual(expectedResult);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('boolean_array'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'Are services meeting performance targets?',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });

  describe('datetimeArray method', () => {
    const expectedResult = [
      '2023-11-15T17:00:00Z',
      '2023-12-01T17:00:00Z',
      '2023-12-20T17:00:00Z',
    ];

    it('should return the correct datetime array for a datetime array query', async () => {
      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.datetimeArray(
        'What are the upcoming project deadlines?',
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('string');
      expect(data).toEqual(expectedResult);
      expect(new Date(data![0])).toBeInstanceOf(Date);
      expect(new Date(data![0]).getFullYear()).toBe(2023);
    });

    it('should return the correct datetime array for a datetime array query with contextId', async () => {
      const contextId = '12345678-90ab-cdef-g123-456789abcdef';

      fetchMock.mockOnce(JSON.stringify({ data: expectedResult }), {
        status: 200,
      });

      const { data } = await hyper.types.datetimeArray(
        'What are the upcoming project deadlines?',
        { contextId },
      );

      expect(typeof data).toBe('object');
      expect(Array.isArray(data)).toBe(true);
      expect(typeof data![0]).toBe('string');
      expect(data).toEqual(expectedResult);
      expect(new Date(data![0])).toBeInstanceOf(Date);
      expect(new Date(data![0]).getFullYear()).toBe(2023);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint('datetime_array'), // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'What are the upcoming project deadlines?',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });
});
