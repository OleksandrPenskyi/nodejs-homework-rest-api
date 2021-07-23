/* eslint-disable semi */
/* eslint-disable quotes */
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "comma-dangle": "off",
    "space-before-function-paren": "off",
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
