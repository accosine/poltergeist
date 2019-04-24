import codegen from 'babel-plugin-codegen/macro';

codegen`
const config = require('../config.json');
module.exports = "let theme = () => ({ article: () => 'Theme " + config.application.theme + " not found.', page: () => 'Theme " + config.application.theme + " not found.', }); try { theme = require('" + config.application.theme + "').Theme; } catch (e) { if (process.env.NODE_ENV === 'production' || e.code !== 'MODULE_NOT_FOUND') { throw e; } } module.exports = theme;";
`;
