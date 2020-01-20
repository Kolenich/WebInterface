// @ts-ignore
const customizer = require('customize-cra');

module.exports = customizer.override(
  customizer.addBabelPlugin([
    'module-resolver',
    {
      alias: {
        '^components/*': './src/pages/*',
        '^lib/*': './src/lib/*',
        '^generic/*': './src/components/*',
        '^masks/*': './src/masks/*',
        '^assets/*': './src/assets/*',
        '^router/*': './src/router/*',
        '^context/*': './src/context/*',
        '^decorators/*': './src/decorators/*',
      },
    },
  ]),
);
