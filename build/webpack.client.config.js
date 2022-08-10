const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    ,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env', // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    client: './src/entry-client.js',
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:6].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: getStyleLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: getStyleLoaders('sass-loader'),
      },
    ],
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk.css',
    }),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    // }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
});
