module.exports = {
  root: true,
  env: {
    node: true,
  },
  // ignorePatterns: ['src/vendor/webix/*'], // <<< ignore all files in test folder
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
