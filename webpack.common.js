const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: { crypto: false },
    },
    module: {
        rules: [
            // JavaScript
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use:  [
                    {
                      // Adds CSS to the DOM by injecting a `<style>` tag
                      loader: 'style-loader'
                    },
                    {
                      // Interprets `@import` and `url()` like `import/require()` and will resolve them
                      loader: 'css-loader'
                    },
                    {
                      // Loader for webpack to process CSS with PostCSS
                      loader: 'postcss-loader',
                      options: {
                        postcssOptions: {
                          plugins: [
                            autoprefixer
                          ]
                        }
                      }
                    },
                    {
                      // Loads a SASS/SCSS file and compiles it to CSS
                      loader: 'sass-loader'
                    }
                  ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Resume-Builder',
            template: path.resolve(__dirname, './public/index.html'), // template file
            filename: 'index.html', // output file
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: `./public/manifest.json`,
                    to: `./assets/manifest.json`
                },
                {
                    from: `./public/robots.txt`,
                    to: `./assets/robots.txt`
                },
                {
                    from: `./public/icons`,
                    to: `./assets/icons`
                },
                {
                    from: `./src/img`,
                    to: `./assets/img`
                }
            ]
        })

    ],
}