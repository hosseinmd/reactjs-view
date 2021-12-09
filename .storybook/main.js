const configOverrides = require("../config-overrides");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/react",
    "storybook/addons",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/core-events",
    "@storybook/api",
  ],
  previewHead: (head) => `
  ${head}
  <style>
    #docs-root {
      overflow:auto;
      height:100%;
      scrollbar-width: thin;
      scrollbar-color: #91a8c3 transparent; 
    }
    #docs-root::-webkit-scrollbar {
      width: 8px;
    }
    #docs-root::-webkit-scrollbar-track {
      background: transparent;
    }
    #docs-root::-webkit-scrollbar-thumb {
      background: #91a8c3;
    }
  </style>
`,
  webpackFinal: async (config) => {
    config = configOverrides.webpack(config, "", 5);

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
      // make sure we're rendering output using **web** Storybook not react-native
      "@storybook/react-native": "@storybook/react",
      // plugin-level react-native-web extensions
      "react-native-svg": "react-native-svg/lib/commonjs/ReactNativeSVG.web",
      // ...
    };

    config.plugins.forEach((plugin) => {
      if (plugin?.definitions?.__MOCK__ === false) {
        plugin.definitions.__MOCK__ = true;
      }
    });

    // mutate babel-loader
    // config.module.rules[0].use[0].options.plugins.push([
    //   'react-native-web',
    //   { commonjs: true },
    // ]);
    // console.dir(config, { depth: null });

    return config;
  },
};
