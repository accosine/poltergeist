const path = require('path');
const WrapperPlugin = require('wrapper-webpack-plugin');

const serverConfig = {
  target: 'node',
  mode: 'production',
  entry: path.resolve(__dirname, 'dist/index.js'),
  output: {
    library: '',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: 'television.js',
  },
  plugins: [
    new WrapperPlugin({
      header: filename => {
        console.log('PLUGIN', filename);
        return '/* eslint-disable */\n';
      },
    }),
  ],
};

module.exports = [serverConfig];
