module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  ignore: ['**/__tests__'],
};
