const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Create paths
const paths = {
    COMPONENTS: path.resolve(__dirname, 'src/components'),
    DIST: path.resolve(__dirname, 'dist'),
    IMG: path.resolve(__dirname, 'src/assets/img'),
    SRC: path.resolve(__dirname, 'src'),
    STYLES: path.resolve(__dirname, 'src/styles')
};

// Configure Webpack
module.exports = {
    watch: true,
    entry: [
        path.join(paths.SRC, 'app.js')
    ],
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            Components: paths.COMPONENTS,
            Img: paths.IMG,
            Src: paths.SRC,
            Styles: paths.STYLES
        }
    }
};
