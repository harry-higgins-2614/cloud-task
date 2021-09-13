import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  target: 'node',
  mode: 'production',
  entry: path.resolve('src', 'index.ts'),
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: false,
  },
  externals: ['aws-sdk'],
};

export default config;
