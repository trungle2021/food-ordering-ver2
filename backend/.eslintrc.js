module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'filenames', 'prettier'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      // Variables, functions, and parameters use camelCase
      {
        selector: 'variableLike',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      // Types, interfaces, and classes use PascalCase
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // Constants use UPPER_CASE
      {
        selector: 'variable',
        modifiers: ['const', 'global'],
        format: ['UPPER_CASE'],
      },
    ],
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'filenames/match-regex': ['error', '^[a-z-]+$', true],
    'filenames/match-exported': ['error', 'kebab'],
    'prettier/prettier': 'error',
  },
};
