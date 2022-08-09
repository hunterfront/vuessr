const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  context: path.resolve(),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  watchOptions: {
    // 不监听的 node_modules 目录下的文件
    ignored: /node_modules/,
  },

  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['module', 'browser', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // publicPath: '//cdn2.com/id/'
          //   },
          // },
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader?cacheDirectory'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk.css',
    }),
    new VueLoaderPlugin(),
  ],
};
