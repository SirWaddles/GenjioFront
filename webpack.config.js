const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'html/njs/'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
      }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-react']
                    }
                },
                exclude: /node_modules/,
            }
        ]
    }
};
