module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@store': './src/store',
          '@theme': './src/theme',
          '@app-types': './src/types',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
        },
      },
    ],
    ...(process.env.NODE_ENV !== 'test'
      ? [
          [
            'module:react-native-dotenv',
            {
              moduleName: '@env',
              path: '.env',
              safe: true,
              allowUndefined: false,
            },
          ],
        ]
      : []),
    'react-native-reanimated/plugin',
  ],
};
