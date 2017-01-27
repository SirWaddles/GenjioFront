module.exports = {
    entry: './src/entry.js',
    output: {
        path: 'njs/',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
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
