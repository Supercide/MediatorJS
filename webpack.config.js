const path = require('path');

module.exports = {
  entry: './lib/mediator.js',
  module: {
    rules: [{
            test: require.resolve('./lib/handle'),
            use: [{
                loader: 'expose-loader',
                options: 'mediator'
            }]
        }]
  },
  output: {
    filename: 'mediator.js',
    path: path.resolve(__dirname, 'dist')
  }
};