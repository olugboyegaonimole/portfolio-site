// functions/eslint.config.js

import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    ignores: [
      'lib/components/**', // Ignore frontend components
      'lib/**.js',          // Optionally ignore compiled files
      'node_modules/**'
    ],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 2022,
      globals: {
        require: true,
        module: true,
        exports: true,
      },
    },
  },
]
