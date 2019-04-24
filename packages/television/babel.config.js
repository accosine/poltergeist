module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  plugins: ['macros'],
  ignore: ['**/__tests__'],
};
