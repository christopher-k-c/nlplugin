const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackObfuscator = require('webpack-obfuscator');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'production',

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         filename: 'vendors.js',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'post',
        use: {
          loader: WebpackObfuscator.loader,
          options: {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            shuffleStringArray: true,
            splitStrings: true,
            stringArrayThreshold: 1,
            deadCodeInjection: true,
            selfDefending: true,
            debugProtection: true
          }
        }
      }
    ],
  },

  // plugins: []
  plugins: [
    new Dotenv({
      path: './.env', // Path to your .env file
      systemvars: true, // Load system environment variables as well
    }),
    // Other plugins like WebpackObfuscator
  ],
});
