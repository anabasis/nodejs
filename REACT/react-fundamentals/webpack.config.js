var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    mode: "development",

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        hot : true,
        inline: true,
        host : '0.0.0.0',
        port: 7777,
        contentBase: __dirname + '/public/'
    },

    module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'stage-0','react']
                    }
                }
            ]
        },

    plugins : [
      new webpack.HotModuleReplacementPlugin()
    ]
};
