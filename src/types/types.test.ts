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
  });
});
