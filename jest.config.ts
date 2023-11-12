module.exports = {
  preset: 'ts-jest/presets/default-esm', // Use the ESM preset for ts-jest
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'node', // Specify the test environment
  testMatch: ['**/*.test.ts'], // Match test files
  extensionsToTreatAsEsm: ['.ts'], // Treat these extensions as ESM
  // If you have a custom setup file, you need to use the full filename including extension
  transform: {}, // ts-jest will be used for ts/tsx files automatically
};
