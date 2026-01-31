module.exports = api => {
  api.cache(true);

  const isProduction = process.env.NODE_ENV === 'production';

  const aliasPaths = {
    // Alias de caminho padrão
    //"@controleonline": isProduction      ? "./node_modules/@controleonline"      : "./modules/controleonline",
    '@controleonline': './modules/controleonline',
    '@env': './config/env.local.js',
    '@stores': './src/store/stores.js',
    '@store': './src/store',
    '@controleonline-rn': './node_modules/@controleonline',
  };

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      ['module:react-native-dotenv','react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          alias: aliasPaths,
        },
      ],
    ],
  };
};
