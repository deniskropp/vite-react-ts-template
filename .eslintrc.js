module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint/eslint-plugin',
  ],
  extends: ['eslint:recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'no-multiple-empty-lines': ['error', {max: 2}],
    'no-trailing-spaces': ['error', {skipBlankLines: true}],
    // 强制使用单引号
    quotes: ['error', 'single'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
