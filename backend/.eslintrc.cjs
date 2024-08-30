module.exports = {
  root: true,
  env: { node: true },
  extends: ['madbooster-node-app'],
  ignorePatterns: ['.eslintrc.cjs', 'models.test.js'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
  },
};
