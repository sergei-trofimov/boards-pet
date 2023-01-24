/** @type {import('ts-jest').JestConfigWithTsJest} */
const tsConfig = require('./tsconfig.paths.json');
const path = require('path');
const moduleNameMapper = Object.keys(tsConfig.compilerOptions.paths).reduce((aliases, aliasName) => {
  const aliasPath = path.resolve(__dirname, tsConfig.compilerOptions.paths[aliasName][0]);

  return {
    ...aliases,
    ['^' + aliasName.replace('/*', '(.*)$')]: aliasPath.replace('*', '$1'),
  }
}, {});

module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'json'],
  moduleNameMapper
};
