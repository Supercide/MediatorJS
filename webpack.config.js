const path = require('path');

module.exports = {
  entry: './lib/handle.js',
  module: {
    rules: [{
            test: require.resolve('./lib/handle'),
            use: [{
                loader: 'expose-loader',
                options: 'handle'
            }]
        }]
  },
  output: {
    filename: 'handle.js',
    path: path.resolve(__dirname, 'dist')
  }
};