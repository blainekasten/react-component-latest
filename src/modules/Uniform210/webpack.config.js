const path = require('path');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: path.join(__dirname, '../../../public'),
    filename: 'Uniform210.js',
    libraryTarget: 'umd',
    library: '__uniform',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ],
  },
};
