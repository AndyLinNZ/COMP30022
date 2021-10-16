const path = require('path')
const process = require('process')

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
    stories: ['../stories/*.stories.jsx'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-docs',
        '@storybook/addon-controls',
        '@storybook/addon-viewport',
    ],
    // first fix: https://github.com/chakra-ui/chakra-ui/blob/main/.storybook/main.js
    // second fix: https://github.com/storybookjs/storybook/issues/11639#issuecomment-689835701
    webpackFinal: (config) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    '@emotion/core': toPath('node_modules/@emotion/react'),
                    'emotion-theming': toPath('node_modules/@emotion/react'),
                },
                modules: [
                    ...config.resolve.modules,
                    path.resolve(__dirname, '..', 'src'),
                    'node_modules',
                ],
            },
        }
    },
}
