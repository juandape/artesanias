module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/react-in-jsx-scope': 'off',
    quotes: [1, 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-single'],
    'react/jsx-one-expression-per-line': 'off',
  },
};