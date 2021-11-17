const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const ESLintPlugin = require("eslint-webpack-plugin/");

// const parser = fs.readFileSync(
//   path.resolve('./shim/react-docgen-typescript/lib/parser.js'),
// );

// fs.writeFileSync(
//   path.resolve('../../node_modules/react-docgen-typescript/lib/parser.js'),
//   parser,
// );

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

const appIncludes = [resolvePath("../")];

const lessExtension = /\.less$/;
const lessModuleExtension = /\.module.less$/;

function createRewireLess(lessLoaderOptions = {}) {
  return function (config, env, oneOfIndex) {
    // Exclude all less files (including module files) from file-loader
    const fileLoader =
      config.module.rules[oneOfIndex].oneOf[
        config.module.rules[oneOfIndex].oneOf.length - 1
      ];
    fileLoader.exclude.push(lessExtension);

    const createRule = (rule, cssRules) => {
      if (env === "production") {
        return {
          ...rule,
          use: [
            ...cssRules.use,
            {
              loader: "less-loader",
              options: {
                ...lessLoaderOptions,
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        };
      } else {
        return {
          ...rule,
          use: [
            ...cssRules.use,
            {
              loader: "less-loader",
              options: {
                ...lessLoaderOptions,
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        };
      }
    };

    const lessRules = createRule(
      {
        test: lessExtension,
        exclude: lessModuleExtension,
      },
      config.module.rules[oneOfIndex].oneOf.find(
        (rule) => String(rule.test) === String(/\.css$/),
      ),
      // Get a copy of the CSS loader
    );

    const lessModuleRules = createRule(
      { test: lessModuleExtension },
      // Get a copy of the CSS module loader
      config.module.rules[oneOfIndex].oneOf.find(
        (rule) => String(rule.test) === String(/\.module\.css$/),
      ),
    );

    const oneOfRule = config.module.rules.find(
      (rule) => rule.oneOf !== undefined,
    );
    if (oneOfRule) {
      oneOfRule.oneOf.unshift(lessRules);
      oneOfRule.oneOf.unshift(lessModuleRules);
    } else {
      // Fallback to previous behaviour of adding to the end of the rules list.
      config.module.rules.push(lessRules);
      config.module.rules.push(lessModuleRules);
    }

    return config;
  };
}

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: (config, env, oneOfIndex = 1) => {
    config.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => !(plugin instanceof ModuleScopePlugin),
    );

    config.module.rules[0].include = appIncludes;
    if (config.module.rules[1].oneOf) {
      config.module.rules[1].oneOf[2].include = appIncludes;
    }
    config = createRewireLess({
      // javascriptEnabled: true,
      // publicPath: '../../',
    })(config, env, oneOfIndex);

    const __DEV__ = env !== "production";
    const isStage = process.argv.indexOf("--stage") !== -1;
    const isRC = process.argv.indexOf("--rc") !== -1;
    const isProduction = process.argv.indexOf("--production") !== -1;
    const __MOCK__ = process.argv.indexOf("--mock") !== -1;

    config.plugins.push(
      new webpack.DefinePlugin({ __DEV__ }),
      new webpack.DefinePlugin({ __MOCK__ }),
      new webpack.DefinePlugin({ __STAGE__: isStage }),
      new webpack.DefinePlugin({ __RC__: isRC }),
      new webpack.DefinePlugin({ __PRODUCTION__: isProduction }),
    );

    config.plugins = config.plugins.filter((v) => !(v instanceof ESLintPlugin));

    if (config.module.rules[1].oneOf) {
      config.module.rules[1].oneOf[4].options.plugins = [
        ...config.module.rules[1].oneOf[4].options.plugins,
        "@babel/plugin-proposal-logical-assignment-operators",
      ];
    } else {
      config.module.rules[5].oneOf[4].options.plugins = [
        ...config.module.rules[5].oneOf[4].options.plugins,
        "@babel/plugin-proposal-logical-assignment-operators",
      ];
    }

    return config;
  },
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function (config) {
    // ...add your jest config customisation...
    // Example: enable/disable some tests based on environment variables in the .env file.
    // if (!config.testPathIgnorePatterns) {
    //   config.testPathIgnorePatterns = [];
    // }
    // if (!process.env.RUN_COMPONENT_TESTS) {
    //   config.testPathIgnorePatterns.push(
    //     '<rootDir>/src/components/**/*.test.js',
    //   );
    // }
    // if (!process.env.RUN_REDUCER_TESTS) {
    //   config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
    // }

    config.rootDir = path.join(__dirname, "../../");
    config.roots = [...config.roots, "<rootDir>/packages"];
    (config.testMatch = [
      "<rootDir>/packages/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/packages/**/*.{spec,test}.{js,jsx,ts,tsx}",
    ]),
      (config.setupFiles = [
        ...(config.setupFiles || []),
        path.join(__dirname, "./path/jestSetupFile.js"),
      ]);
    config.globals = {
      ...config.globals,
      __DEV__: true,
      __MOCK__: true,
    };
    config.testPathIgnorePatterns = [
      ...(config.testPathIgnorePatterns || []),
      "/node_modules/",
    ];

    return config;
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function (configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.

      // config.https = {
      //   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
      //   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
      //   ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
      //   passphrase: process.env.REACT_HTTPS_PASS,
      // };

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function (paths, env) {
    // ...add your paths config
    return paths;
  },
};
