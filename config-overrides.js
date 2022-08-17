const { aliasWebpack, aliasJest } = require('react-app-alias');

const aliasMap = {
  '@components': 'src/components',
  '@services': 'src/services',
  '@hooks': 'src/hooks',
  '@pages': 'src/pages',
  '@mocks': 'src/mocks',
  '@assets': 'src/assets',
  '@colors': 'src/colors',
  '@redux': 'src/redux-toolkit',
  '@root': 'src'
};

const options = {
  alias: aliasMap
};

module.exports = aliasWebpack(options);
module.exports.jest = aliasJest(options);
