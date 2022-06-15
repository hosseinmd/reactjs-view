const configOverrides = require("../config-overrides");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config = configOverrides.webpack(config, "", 5);

    // config.resolve.alias = {
    //   ...(config.resolve.alias || {}),
    //   // Transform all direct `react-native` imports to `react-native-web`
    //   "react-native$": "react-native-web",
    //   // make sure we're rendering output using **web** Storybook not react-native
    //   "@storybook/react-native": "@storybook/react",
    //   // plugin-level react-native-web extensions
    //   "react-native-svg": "react-native-svg/lib/commonjs/ReactNativeSVG.web",
    //   // ...
    // };

    // config.plugins.forEach((plugin) => {
    //   if (plugin?.definitions?.__MOCK__ === false) {
    //     plugin.definitions.__MOCK__ = true;
    //   }
    // });

    // mutate babel-loader
    // config.module.rules[0].use[0].options.plugins.push([
    //   'react-native-web',
    //   { commonjs: true },
    // ]);
    // console.dir(config, { depth: null });

    return config;
  },
};
