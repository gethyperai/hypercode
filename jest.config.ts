import { JestConfigWithTsJest } from 'ts-jest/';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/examples/'],
  modulePathIgnorePatterns: ['<rootDir>/examples/'],
  prettierPath: '<rootDir>/node_modules/prettier',
};

export default config;
