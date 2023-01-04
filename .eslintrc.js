module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [ 'airbnb-base/legacy', 'prettier', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'no-debugger': 'off',
    'no-console': 0,
    'class-methods-use-this': 'off',
    curly: 'error',
  },
};
