import { enableFetchMocks } from 'jest-fetch-mock';
import { Hyper } from '../index';

enableFetchMocks();

const baseUrl = process.env.HYPER_BASE_URL || 'https://api.gethyper.ai/v1';
const endpoint = '/search';
const fullEndpoint = `${baseUrl}${endpoint}`;

const hyper = new Hyper('hyper_1234');

describe('Hypercode Search API methods', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('execute method', () => {
    it('should return the correct search results for a query with contextId', async () => {
      const expectedResult = [
        {
          metadata: {
            name: 'Quarterly Sales Report Q1 2023',
            source: 'https://enterprise.gethyper.ai/reports/q1-sales-2023',
            type: 'web',
          },
          page_content:
            'Quarterly Sales Report Q1 2023\nExecutive Summary\nThe first quarter saw a 17% increase in sales across all sectors. The enterprise software division exceeded its targets with a significant contribution to the overall growth...',
          type: 'Document',
        },
        {
          metadata: {
            name: 'Market Analysis: Q1 Consumer Trends',
            source: 'https://enterprise.gethyper.ai/analyses/q1-market-trends',
            type: 'web',
          },
          page_content:
            'Market Analysis: Q1 Consumer Trends\nAbstract\nThis paper provides an in-depth analysis of consumer trends in the first quarter of 2023, highlighting the shifts in customer behavior...',
          type: 'Document',
        },
      ];

      const contextId = '123e4567-e89b-12d3-a456-426614174000';

      fetchMock.mockOnce(JSON.stringify(expectedResult), {
        status: 200,
      });

      const result = await hyper.search.execute('quarterly sales report', {
        contextId,
      });

      expect(result.data).toEqual(expectedResult);
      expect(fetchMock).toHaveBeenLastCalledWith(
        fullEndpoint, // endpoint
        // body and headers
        expect.objectContaining({
          body: expect.stringContaining(
            JSON.stringify({
              query: 'quarterly sales report',
              context_id: contextId,
            }),
          ),
        }),
      );
    });
  });
});
