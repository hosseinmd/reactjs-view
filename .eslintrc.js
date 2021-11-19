const isCommit = process.env.COMMIT;

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    sourceType: "module",
    createDefaultProgram: true,
  },
  extends: [
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  plugins: ["react-hooks"],
  rules: {
    "no-console": [isCommit ? "error" : "warn", { allow: ["warn", "error"] }],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-var": "error",
    "prefer-const": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "error", // Checks effect dependencies
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/camelcase": "off",
    "prettier/prettier": [
      "off",
      {
        endOfLine: "auto",
      },
    ],
    camelcase: "off",
    ...(isCommit
      ? {
          "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_", ignoreRestSiblings: true },
          ],
          "@typescript-eslint/no-non-null-assertion": "error",
        }
      : {
          "@typescript-eslint/naming-convention": [
            "error",
            // {
            //   selector: 'default',
            //   format: ['camelCase'],
            // },
            {
              selector: "variable",
              format: ["camelCase", "UPPER_CASE", "PascalCase"],
              leadingUnderscore: "allow",
              filter: {
                // you can expand this regex to add more allowed names
                regex: "^([_]+[A-Z]+[_]+)$",
                match: false,
              },
            },
            {
              selector: "variable",
              types: ["boolean"],
              format: ["PascalCase", "UPPER_CASE"],
              prefix: ["is", "should", "has", "can", "did", "will"],
              filter: {
                // you can expand this regex to add more allowed names
                regex: "^[_]+.*$",
                match: false,
              },
            },
            {
              selector: "function",
              format: ["camelCase", "PascalCase"],
              leadingUnderscore: "allow",
            },
            // {
            //   selector: 'parameter',
            //   format: ['strictCamelCase'],
            //   leadingUnderscore: 'allow',
            // },
            // {
            //   selector: 'memberLike',
            //   format: ['strictCamelCase'],
            //   leadingUnderscore: 'allow',
            // },
            {
              selector: "typeLike",
              format: ["PascalCase"],
            },
          ],
        }),
  },
};
