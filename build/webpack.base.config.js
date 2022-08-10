const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  context: path.resolve(),
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
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __SERVICE__: JSON.stringify(process.env.SERVICE),
    }),
  ],
};
