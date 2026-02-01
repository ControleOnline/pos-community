const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    extraNodeModules: {
      ...defaultConfig.resolver.extraNodeModules,
      "@store": path.resolve(__dirname, "src/store"),
    },
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
  },
  transformer: {
    ...defaultConfig.transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};