module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@controleonline': './modules/controleonline',
          '@env': './config/env.local.js',
          '@stores': './src/store/stores.js',
          '@store': './src/store',
          '@controleonline-rn': './node_modules/@controleonline',
        },
      },
    ],
  ],
};
