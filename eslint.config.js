import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['node_modules/**', 'dist/**'], // Fichiers/dossiers à ignorer
  },
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...vuePlugin.configs['vue3-recommended'].rules, // Règles recommandées pour Vue 3
      ...tsPlugin.configs['recommended'].rules, // Règles recommandées pour TypeScript
      'vue/script-setup-uses-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': [
        'warn',
        {
          htmlWhitespaceSensitivity: 'ignore',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // Désactiver les erreurs pour "any"
      'vue/html-closing-bracket-spacing': [
        'warn',
        {
          startTag: 'never',
          endTag: 'never',
          selfClosingTag: 'always',
        },
      ],
      'vue/html-indent': [
        'warn',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          alignAttributesVertically: true,
        },
      ],
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: 3,
          multiline: {
            max: 1,
          },
        },
      ],
      'no-multiple-empty-lines': [
        'warn',
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
    },
  },
]
