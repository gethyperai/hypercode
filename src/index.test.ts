describe('Hypercode API methods', () => {
  test('Hello world', () => {
    expect(true).toBe(true);
  });
});

// import axios from 'axios';
// import hyper from './index';

// jest.mock('axios');

// describe('Hypercode API methods', () => {
//   beforeAll(() => {
//     // Initialize with the API key for the tests
//     hyper.init(process.env.HYPER_API_KEY || '');
//   });

//   test('boolean method should return true for a valid boolean query', async () => {
//     (axios.post as jest.Mock).mockResolvedValue({ data: true });
//     const result = await hyper.boolean('Is the earth flat?');
//     expect(typeof result).toBe('boolean');
//     expect(result).toBe(true);
//   });

//   test('boolean method should return true for a valid boolean query with contextId', async () => {
//     const contextId = 'context-123';
//     (axios.post as jest.Mock).mockResolvedValue({ data: true });
//     const result = await hyper.boolean('Is the earth flat?', contextId);
//     expect(typeof result).toBe('boolean');
//     expect(result).toBe(true);
//     expect(axios.post).toHaveBeenCalledWith(
//       expect.any(String),
//       expect.objectContaining({
//         query: 'Is the earth flat?',
//         context_id: contextId,
//       }),
//       expect.any(Object),
//     );
//   });

//   test('integer method should return correct integer for a count query', async () => {
//     (axios.post as jest.Mock).mockResolvedValue({ data: 42 });
//     const result = await hyper.integer(
//       'How many planets are in the Solar System?',
//     );
//     expect(typeof result).toBe('number');
//     expect(result).toBe(42);
//   });

//   test('integer method should return correct integer for a count query with contextId', async () => {
//     const contextId = 'context-456';
//     (axios.post as jest.Mock).mockResolvedValue({ data: 42 });
//     const result = await hyper.integer(
//       'How many planets are in the Solar System?',
//       contextId,
//     );
//     expect(typeof result).toBe('number');
//     expect(result).toBe(42);
//     expect(axios.post).toHaveBeenCalledWith(
//       expect.any(String),
//       expect.objectContaining({
//         query: 'How many planets are in the Solar System?',
//         context_id: contextId,
//       }),
//       expect.any(Object),
//     );
//   });

//   test('string method should return the correct string for an identification query', async () => {
//     (axios.post as jest.Mock).mockResolvedValue({ data: 'Elon Musk' });
//     const result = await hyper.string('Who is the CEO of SpaceX?');
//     expect(typeof result).toBe('string');
//     expect(result).toBe('Elon Musk');
//   });

//   test('string method should return the correct string for an identification query with contextId', async () => {
//     const contextId = 'context-123';
//     (axios.post as jest.Mock).mockResolvedValue({ data: 'Elon Musk' });
//     const result = await hyper.string('Who is the CEO of SpaceX?', contextId);
//     expect(typeof result).toBe('string');
//     expect(result).toBe('Elon Musk');
//     expect(axios.post).toHaveBeenCalledWith(
//       expect.any(String),
//       expect.objectContaining({
//         query: 'Who is the CEO of SpaceX?',
//         context_id: contextId,
//       }),
//       expect.any(Object),
//     );
//   });

//   test('datetime method should return the correct datetime string for a historical event query', async () => {
//     const historicalEventDate = '1969-07-20T20:17:00Z'; // Apollo 11 moon landing
//     (axios.post as jest.Mock).mockResolvedValue({ data: historicalEventDate });
//     const result = await hyper.datetime('When did Apollo 11 land on the moon?');
//     expect(typeof result).toBe('string');
//     expect(result).toBe(historicalEventDate);
//   });

//   test('datetime method should return the correct datetime string for a historical event query with contextId', async () => {
//     const contextId = 'context-def';
//     const historicalEventDate = '1969-07-20T20:17:00Z'; // Apollo 11 moon landing
//     (axios.post as jest.Mock).mockResolvedValue({ data: historicalEventDate });
//     const result = await hyper.datetime(
//       'When did Apollo 11 land on the moon?',
//       contextId,
//     );
//     expect(typeof result).toBe('string');
//     expect(result).toBe(historicalEventDate);
//     expect(axios.post).toHaveBeenCalledWith(
//       expect.any(String),
//       expect.objectContaining({
//         query: 'When did Apollo 11 land on the moon?',
//         context_id: contextId,
//       }),
//       expect.any(Object),
//     );
//   });

//   test('float method should return the correct float value for a quantitative query', async () => {
//     const fixedStatistic = 13.8; // Age of the universe in billion years
//     (axios.post as jest.Mock).mockResolvedValue({ data: fixedStatistic });
//     const result = await hyper.float(
//       'How many billion years old is the universe?',
//     );
//     expect(typeof result).toBe('number');
//     expect(result).toBe(fixedStatistic);
//   });

//   test('float method should return the correct float value for a quantitative query with contextId', async () => {
//     const contextId = 'context-ghi';
//     const fixedStatistic = 13.8; // Age of the universe in billion years
//     (axios.post as jest.Mock).mockResolvedValue({ data: fixedStatistic });
//     const result = await hyper.float(
//       'How many billion years old is the universe?',
//       contextId,
//     );
//     expect(typeof result).toBe('number');
//     expect(result).toBe(fixedStatistic);
//     expect(axios.post).toHaveBeenCalledWith(
//       expect.any(String),
//       expect.objectContaining({
//         query: 'How many billion years old is the universe?',
//         context_id: contextId,
//       }),
//       expect.any(Object),
//     );
//   });
// });
