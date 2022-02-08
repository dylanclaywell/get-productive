/* eslint-disable no-undef */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      babelConfig: {
        presets: ['babel-preset-solid', '@babel/preset-env'],
      },
    },
  },
  // insert setupFiles and other config
  // you probably want to test in browser mode:
  testEnvironment: 'jsdom',
  // unfortunately, solid cannot detect browser mode here,
  // so we need to manually point it to the right versions:
  moduleNameMapper: {
    'solid-js/web': '<rootDir>/node_modules/solid-js/web/dist/web.cjs',
    'solid-js': '<rootDir>/node_modules/solid-js/dist/solid.cjs',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/coverage',
    '<rootDir>/dist',
  ],
}
