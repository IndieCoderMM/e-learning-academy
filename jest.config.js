module.exports = {
  roots: ['spec/javascript'],
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
