/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.spec.ts'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
  // resetMocks: true,
  // restoreMocks: true,
};
