import codegen from 'babel-plugin-codegen/macro';

// TODO: find workaround for babel cache problem
// https://github.com/kentcdodds/babel-plugin-macros#babel-cache-problem

export default codegen`
const { application: { plugins } } = require('./config.json');
module.exports = '[' + (plugins || []).map(plugin => "require('" + plugin + "')").join(', ') + ']';
`;
