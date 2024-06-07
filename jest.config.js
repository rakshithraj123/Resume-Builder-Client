// jest.config.js
module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],
    testEnvironment: 'jsdom',
};
