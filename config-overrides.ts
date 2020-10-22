// @ts-ignore
const customizer = require('customize-cra');

module.exports = customizer.override(
  customizer.addBabelPlugin([
    'module-resolver',
    {
      alias: {
        '^components/*': './src/pages/*',
        '^lib/*': './src/lib/*',
        '^pages/*': './src/pages/*',
        '^img/*': './src/img/*',
      },
    },
  ]),
);
