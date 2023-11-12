import { enableFetchMocks } from 'jest-fetch-mock';
import { Hyper } from '../index';

enableFetchMocks();

const hyper = new Hyper('hyper_1234');

describe('Hypercode Types API methods', () => {
  afterEach(() => fetchMock.resetMocks());

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
        expect.any(String), // endpoint
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

      const result = await hyper.types.string(
        'How many planets are in the Solar System?',
        { contextId },
      );

      expect(typeof result.data).toBe('number');
      expect(result.data).toBe(42);
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.any(String), // endpoint
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
        expect.any(String), // endpoint
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
        expect.any(String), // endpoint
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
        expect.any(String), // endpoint
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
});
