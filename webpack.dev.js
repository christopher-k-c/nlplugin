const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development',
	// won't work on XD due to lack of eval
  // devtool: 'eval-cheap-module-source-map', // slightly faster
  devtool: 'eval-source-map',
  plugins: [
    new Dotenv({
      path: './.env', // Path to your .env file
      systemvars: true, // Load system environment variables as well
    }),
  ],
});
