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
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.css' ]
    },
    output: {
        filename: 'stvne.js',
        path: path.resolve('./', 'build')
    }
};