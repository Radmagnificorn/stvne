const path = require('path');

module.exports = {
    entry: './src/App.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.css', '.png' ]
    },
    output: {
        filename: 'stvne.js',
        path: path.resolve('./', 'docs')
    }
};