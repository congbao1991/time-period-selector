const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js'); // 引用公共配置
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "../example/src/index.html"),
  filename: "index.html"
});

const devConfig = {
  mode: 'development', // 开发模式
  output: {
    path: path.join(__dirname, "../example/src/"),
    filename: "bundle.js", // 使用webpack-dev-sevrer启动开发服务时，并不会实际在`src`目录下生成bundle.js，打包好的文件是在内存中的，但并不影响我们使用。
  },
  entry: path.join(__dirname, "../example/src/index.js"),
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader','css-loader'],
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../example/src/'),
    compress: true,
    port: 3001,
    open: true
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
module.exports = merge(devConfig, baseConfig); // 将baseConfig和devConfig合并为一个配置
