const path = require('path');

module.exports = {
    entry: './src/App.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'stvne.js',
        path: path.resolve('./', 'build')
    }
};