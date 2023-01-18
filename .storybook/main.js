module.exports = {
    stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', 'storybook-addon-next'],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
};
