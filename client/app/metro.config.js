/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('metro-config');
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();

exports.resolver = {
  ...defaultResolver,
  transformer: {
    ...defaultResolver,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  sourceExts: [...defaultResolver.sourceExts, 'cjs'],
};
