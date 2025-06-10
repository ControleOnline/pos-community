module.exports = api => {
  api.cache(true);

  const isProduction = process.env.NODE_ENV === 'production';

  const aliasPaths = {
    '@controleonline': './modules/controleonline',
    '@env': './config/env.local.js',
    '@stores': './src/store/stores.js',
    '@store': './src/store',
  };

  return {
    sourceType: 'unambiguous',

    presets: [
      [
        '@babel/preset-env',
        {
          targets: {esmodules: true},
          modules: false,
          loose: true,
        },
      ],
      [
        'babel-preset-expo',
        {
          loose: true,
        },
      ],
    ],
    plugins: [
      ['module:react-native-dotenv'],
      [
        'module-resolver',
        {
          alias: aliasPaths,
        },
      ],
      '@babel/plugin-transform-runtime',
      'react-native-web',
    ],
  };
};
