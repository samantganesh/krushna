import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import boundaries from 'eslint-plugin-boundaries';
import promise from 'eslint-plugin-promise';

export default tseslint.config(
  { ignores: ['dist', '*.config.js'] },
  ...tseslint.configs.strictTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      sonarjs: sonarjs,
      unicorn: unicorn,
      boundaries: boundaries,
      promise: promise,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'boundaries/elements': [
        { type: 'core', pattern: 'src/features/core/*' },
        { type: 'service', pattern: 'src/features/services/*' },
        { type: 'feature', pattern: 'src/features/!(core|services)/*' },
      ],
      'boundaries/ignore': ['src/main.tsx', 'src/App.tsx'],
    },
    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Complexity & Size Limits
      'max-lines': [
        'error',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-lines-per-function': [
        'error',
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-classes-per-file': ['error', 1],
      complexity: ['error', 10],
      'max-depth': ['error', 3],
      'max-params': ['error', 4],
      'max-statements': ['error', 20],
      'max-nested-callbacks': ['error', 3],

      // Variable Safety
      'no-unused-vars': 'off', // Using TypeScript version
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-shadow': 'off', // Using TypeScript version
      '@typescript-eslint/no-shadow': 'error',
      'prefer-const': 'error',
      'no-var': 'error',

      // Control Flow
      'consistent-return': 'error',
      'default-case-last': 'error',
      'no-fallthrough': 'error',
      'no-else-return': ['error', { allowElseIf: false }],

      // Equality & Coercion
      eqeqeq: ['error', 'always'],

      // Mutation Safety
      'no-param-reassign': ['error', { props: true }],

      // Code Clarity
      'no-magic-numbers': [
        'error',
        {
          ignore: [0, 1, -1, 2, 3, 4, 8, 16, 24, 32, 100],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          detectObjects: false,
        },
      ],
      'no-nested-ternary': 'error',

      // TypeScript Strict
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            '{}': {
              message:
                'Use Record<string, unknown> or a specific interface instead of {}',
              fixWith: 'Record<string, unknown>',
            },
          },
        },
      ],

      // Import Rules
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-default-export': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{ts,tsx}',
            '**/*.spec.{ts,tsx}',
            'vite.config.ts',
            'vitest.config.ts',
            '**/test/setup.ts',
          ],
        },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/no-useless-path-segments': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // React Rules
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-array-index-key': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/hook-use-state': 'error',
      'react/prop-types': 'off', // Using TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      'react/jsx-max-depth': ['error', { max: 6 }],

      // Detect eslint-disable usage
      'no-warning-comments': [
        'warn',
        {
          terms: ['eslint-disable'],
          location: 'anywhere',
        },
      ],

      // SonarJS — Cognitive Complexity & Code Quality
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',

      // Unicorn — Selective Rules
      'unicorn/no-array-for-each': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/no-useless-undefined': 'error',
      'unicorn/prefer-string-slice': 'error',

      // Promise Hygiene
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/no-multiple-resolved': 'error',

      // Architectural Boundaries
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'feature', allow: ['core'] },
            { from: 'service', allow: ['core'] },
          ],
        },
      ],
    },
  },

  // Exceptions for test files
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      'max-lines-per-function': [
        'error',
        {
          max: 100, // Allow longer test functions
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-statements': ['error', 40], // Tests often have many assertions
      'no-magic-numbers': 'off', // Tests can use literals freely
      'max-lines': [
        'error',
        { max: 400, skipBlankLines: true, skipComments: true },
      ],
    },
  },

  // Exceptions for config files (Vite, etc.)
  {
    files: ['*.config.{ts,js}', 'vite.config.{ts,js}'],
    rules: {
      'import/no-default-export': 'off', // Config files require default exports
    },
  }
);
