const HWP = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'build.js',
    path: path.join(__dirname, '/dist')
  },
  module:{
    rules:[
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
          plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
        }
      },
      {
        test: /\.s?css/,
        use: [
          'style-loader', 'css-loader', 'sass-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins:[
    new HWP({
      title: 'Development',
      template: path.join(__dirname,'./src/index.html')
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/build'
    },
    proxy: {
      '/api': 'http://localhost:1111',
    }
  }
};