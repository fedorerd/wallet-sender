const { ProvidePlugin } = require('webpack');

module.exports = function (config, _) {
    return {
        ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.m?[jt]sx?$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
                {
                    test: /\.m?[jt]sx?$/,
                    resolve: {
                        fullySpecified: false,
                    },
                },
            ],
        },
        plugins: [
            ...config.plugins,
            new ProvidePlugin({
                Buffer: ['buffer', 'Buffer']
            }),
            new ProvidePlugin({
                process: 'process/browser'
            }),
        ],
        resolve: {
            ...config.resolve,
            fallback: {
                stream: require.resolve('stream-browserify'),
                crypto: require.resolve('crypto-browserify')
            },
        },
        ignoreWarnings: [/Failed to parse source map/],
    };
};