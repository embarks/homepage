/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const tsconfig = require('./tsconfig')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper,
  rootDir: './'
}
