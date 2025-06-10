const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Importe o plugin

const appDirectory = path.resolve(__dirname, '');

const appMainFile = path.resolve(appDirectory, 'index.js');

module.exports = {
  target: 'web',
  entry: appMainFile,
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'web-build'),
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.web.js',
      '.js',
      '.jsx',
      '.json',
      '.web.jsx',
      '.ts',
      '.tsx',
      '.web.ts',
      '.web.tsx',
    ],
    alias: {
      'react-native$': 'react-native-web',
      '@store': path.resolve(appDirectory, 'src/store'),
      '@stores': path.resolve(appDirectory, 'src/store/stores.js'),
      '@controleonline': path.resolve(appDirectory, 'modules/controleonline'),
      '@env': path.resolve(appDirectory, 'config/env.local.js'),
    },
    mainFields: ['browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude:
          /node_modules\/(?!(@babel\/runtime|react-native-web|@react-native|react-native|@react-navigation|react-navigation-.*|@expo|expo-.*|react-native-paper|react-native-vector-icons)\/).*/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|eot|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'index.html'),
      filename: 'index.html',
    }),
    // Adicione o CopyWebpackPlugin aqui para copiar o .htaccess
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(appDirectory, 'public/*'), // Caminho para o seu .htaccess
          to: path.resolve(appDirectory, 'web-build'), // Pasta de destino
          noErrorOnMissing: true, // Não gera erro se o arquivo não existir
        },
        // Se você tiver outros arquivos estáticos (como favicon.ico) que não são compilados, pode adicioná-los aqui
        // { from: path.resolve(appDirectory, 'public/favicon.ico'), to: path.resolve(appDirectory, 'web-build') },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(appDirectory, 'web-build'),
      publicPath: '/',
    },
    compress: true,
    port: 8080,
    open: true,
  },
};
