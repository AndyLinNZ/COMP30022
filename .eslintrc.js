module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        'jest/globals': true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['react', 'jest'],
    settings: {
        react: {
            version: 'latest',
        },
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
                avoidEscape: true,
            },
        ],
        semi: ['error', 'never'],
        'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', argsIgnorePattern: '^_' }],
        'react/prop-types': 'off',
    },
}
