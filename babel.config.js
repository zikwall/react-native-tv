module.exports = api => {
  const babelEnv = api.env();
  const plugins = [];

  console.log(`\n ===== ENV is: ${babelEnv} ===== \n`);

  if (babelEnv !== 'development') {
    plugins.push(["transform-remove-console"]);
  }

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
