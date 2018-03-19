const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'html/njs/'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
    plugins: [
        //new BabiliPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
      }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                },
                exclude: /node_modules/,
            }
        ]
    }
};
