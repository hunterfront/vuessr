const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    client: './src/entry-client.js',
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:6].chunk.js',
  },
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'dist'),
    // },
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:3000'
    //     // pathRewrite: { '^/api': '' }
    //   }
    // },
    historyApiFallback: true,
    open: true,
    port: 8088,
    hot: true,
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
});
