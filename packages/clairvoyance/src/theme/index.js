import codegen from 'babel-plugin-codegen/macro';

codegen`
const config = require('../config.json');
module.exports = "module.exports = require('" + config.application.theme + "').Theme"
`;
