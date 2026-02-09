/** @type {import('jest').Config} */
export const preset = 'ts-jest';
export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1',
  '\\.(scss|sass)$': 'identity-obj-proxy',
};
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
export const transform = {
  '^.+\\.(ts|tsx)$': 'ts-jest',
};
