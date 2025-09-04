import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config(
  { ignores: ['dist', 'src/components/generated/**'] },
  {
    extends: [
      js.configs.recommended,
      // Enable type-aware rules for TS
      ...tseslint.configs.recommendedTypeChecked,
      // Optionally add stylistic type-checked set for consistency
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      'react-dom': reactDom,
    },
    rules: {
      // React Hooks best practices
      ...reactHooks.configs.recommended.rules,
      // React DOM and react-x recommended rules for TS
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,

      // Refresh hint for Vite HMR patterns
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Keep project rule: allow unused vars (handled by TS/noise reduction)
      '@typescript-eslint/no-unused-vars': 'off',
    },
  }
);
