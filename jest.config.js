/** @type {import('jest').Config} */
export const preset = 'ts-jest';
export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/$1',
};
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
export const transform = {
  '^.+\\.(ts|tsx)$': 'ts-jest',
};
