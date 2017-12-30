const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./lib/index.js'],
    target: 'web',
    output: {
        path: __dirname,
        filename: 'bundle.js',
        chunkFilename: 'bundle-[name].js',
        publicPath: '/',
    },
    resolve: {
        modules: [
            path.join(__dirname, '/ts'),
            'node_modules',
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'],
        alias: {
            ts: path.join(__dirname, '/ts'),
            less: path.join(__dirname, '/less'),
            md: path.join(__dirname, '/md'),
        },
    },
    module: {
        rules: [],
    },
    devServer: {
        hot: false,
        inline: false,
        port: 3572,
        disableHostCheck: true,
        proxy: {
            '/web3/*': {
                target: 'http://localhost:8545'
            },
        },
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        // Since we do not use moment's locale feature, we exclude them from the bundle.
        // This reduces the bundle size by 0.4MB.
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['BigNumber']
            }
        })
    ] : [],
};
