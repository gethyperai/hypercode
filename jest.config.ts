import { JestConfigWithTsJest } from 'ts-jest/';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.ts'],
  prettierPath: '<rootDir>/node_modules/prettier',
};

export default config;
