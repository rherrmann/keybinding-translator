module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  globals: {
    KeyBindingTranslator: 'writable'
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-tabs': 'error',
    'max-len': ['error', { code: 120 }],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': 'error',
    'no-trailing-spaces': 'error'
  },
  ignorePatterns: [
    'node_modules/**',
    '**/*.min.js'
  ],
}
