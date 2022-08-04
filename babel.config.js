module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
        alias: {
          App: ['./App'],
          Assets: ['./App/Assets'],
          Components: ['./App/Components'],
          Configs: ['./App/Configs'],
          Containers: ['./App/Containers'],
          Hooks: ['./App/Hooks'],
          Lang: ['./App/Lang'],
          Navigations: ['./App/Navigations'],
          Services: ['./App/Services'],
          Store: ['./App/Store'],
          Utils: ['./App/Utils'],
        },
      },
    ],
  ],
};
