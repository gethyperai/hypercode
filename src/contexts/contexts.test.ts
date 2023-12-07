import { enableFetchMocks } from 'jest-fetch-mock';
import { Hyper } from '../index';

enableFetchMocks();

const baseUrl = process.env.HYPER_BASE_URL || 'https://api.gethyper.ai/v1';
const endpoint = '/contexts';
const fullEndpoint = `${baseUrl}${endpoint}`;

const hyper = new Hyper('hyper_1234');

describe('Hypercode contexts API methods', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('list method', () => {
    it('should return the correct list of all created contexts', async () => {
      const expectedResult = [
        {
          created_at: '2023-10-28T04:28:13.971776+00:00',
          id: 'f03f7113-d60e-472f-a266-8e0a1f091386',
          name: 'Data Analysis',
        },
        {
          created_at: '2023-11-02T22:18:44.978052+00:00',
          id: 'a26d4182-4494-4ebc-b19f-1633fddc81d7',
          name: 'Project Management',
        },
        {
          created_at: '2023-10-24T16:33:47.689614+00:00',
          id: '62df1b77-07e9-40e1-8de8-14f2075309e5',
          name: 'Human Resources',
        },
      ];

      fetchMock.mockOnce(JSON.stringify(expectedResult), {
        status: 200,
      });

      const result = await hyper.contexts.all();

      expect(result.data).toEqual(expectedResult);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint, // endpoint
        // body and headers
        expect.any(Object),
      );
    });
  });
});
