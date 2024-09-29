module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y','filenames', 'prettier'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        // Enforce camelCase for variables, functions, and parameters
        {
          selector: 'variableLike',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        // Enforce PascalCase for types, interfaces, and enums
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // Enforce PascalCase for React components
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // Enforce UPPER_CASE for constants
        {
          selector: 'variable',
          modifiers: ['const', 'global'],
          format: ['UPPER_CASE', 'camelCase'],
        },
      ],
  
      // Enforce named exports for components
      'import/no-default-export': 'error',
  
      // Enforce function keyword for pure functions
      'func-style': ['error', 'declaration'],
  
      // Avoid unnecessary curly braces
      'curly': ['error', 'multi-line', 'consistent'],
  
      // Enforce declarative JSX
      'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
  
      // Minimize use of useState and useEffect
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
  
      // Enforce proper image optimization
      'jsx-a11y/alt-text': ['error', { elements: ['img', 'object', 'area', 'input[type="image"]'] }],
  
      // Enforce proper use of dynamic imports
      'import/dynamic-import-chunkname': ['error', { importFunctions: ['dynamicImport'] }],
  
      // Additional rules
      'no-console': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
        
      'filenames/match-regex': ['error', '^[a-z-]+$', true],
    'filenames/match-exported': ['error', 'kebab'],
    'prettier/prettier': 'error',
    },
  };