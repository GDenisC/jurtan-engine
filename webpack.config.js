import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const bundle = true;

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.m?js/,
                type: "javascript/auto",
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: bundle ? 'bundle.js' : '[fullhash].js',
        path: path.resolve('dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devServer: {
        compress: true,
        port: 3000,
        open: true
    }
};

export default config;