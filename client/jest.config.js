module.exports = {
    collectCoverageFrom: [
        '**/src/(components|hooks)/**/*.{js,jsx,ts,tsx}',
        '!**/(svg|icons)/**',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        // https://jestjs.io/docs/webpack#mocking-css-modules
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

        // Handle CSS imports (without CSS modules)
        '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

        // Handle image imports
        // https://jestjs.io/docs/webpack#handling-static-assets
        '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',

        // Handle module aliases
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '@fontsource/*': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
}
