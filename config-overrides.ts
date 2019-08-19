// @ts-ignore
const customizer = require('customize-cra');

module.exports = customizer.override(
  customizer.addBabelPlugin([
                              'module-resolver',
                              {
                                alias: {
                                  '^components/*': './src/components/*',
                                  '^lib/*': './src/lib/*',
                                  '^assets/*': './src/assets/*',
                                },
                              },
                            ]),
);
