const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    output: {
        filename: '[name].[contenthash:8].js',
        path: `${__dirname}/build`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
        ]
    },
    optimization: {
        minimizer: process.env.NODE_ENV === 'development' ? [] : [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html.ejs',
            filename: './index.html',
            inject: false,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ]
};
