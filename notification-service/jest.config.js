/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^(\\.{1,2}/.*)\\.ts$': '$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        diagnostics: {
          ignoreCodes: [2571, 2345, 2352]  // Ignore specific TypeScript errors
        }
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!@nestjs|@babel)'],
  setupFiles: ['./jest.setup.js']  // Add a setup file for additional configuration
};
