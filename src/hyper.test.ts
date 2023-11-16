import { enableFetchMocks } from 'jest-fetch-mock';
import { Hyper } from './hyper';

enableFetchMocks();

describe('Hyper class', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('apiKey property', () => {
    it('should throw an error if no API key is provided', () => {
      expect(() => new Hyper()).toThrow(
        'Missing API key. Pass it to the constructor `new Hyper("hyper_123...")` or set the HYPER_API_KEY environment variable.',
      );

      expect(() => new Hyper('hyper_1234')).not.toThrow(
        'Missing API key. Pass it to the constructor `new Hyper("hyper_123...")` or set the HYPER_API_KEY environment variable.',
      );
    });
  });

  describe('fetchRequest method', () => {
    it('should return error if response is not ok', async () => {
      const hyper = new Hyper('hyper_1234');

      fetchMock.mockOnce(JSON.stringify({ error: 'Not found' }), {
        status: 404,
      });

      const result = await hyper['fetchRequest']({ endpoint: '/not-found' });

      expect(result).toEqual({ data: null, error: 'Not found' });
    });
  });
});
