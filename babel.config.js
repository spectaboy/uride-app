module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // NativeWind v4 does not require a Babel plugin
      // 'nativewind/babel',
    ],
  };
}; 