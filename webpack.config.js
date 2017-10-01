const path = require('path');

module.exports = {
  entry: './lib/MessageContainer.js',
  module: {
    rules: [{
            test: require.resolve('./lib/MessageContainer'),
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