import pluginJs from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}']
    },
    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    },
    {
        ignores: [
            'node_modules/', // Dependencies installed by npm or yarn
            'dist/',         // Build output directory
            'build/',        // Alternate build output directory
            'coverage/',     // Test coverage reports
            '*.log',         // Log files
            '.env',          // Environment variable files
            '.env.*',        // Other environment variable files
            'yarn.lock',     // Yarn lock file
            'pnpm-lock.yaml' // pnpm lock file
        ]
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            'simple-import-sort': simpleImportSort
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error'
        }
    },
    {
        rules: {
            semi: ['error', 'never'],
            quotes: ['error', 'single'],
            indent: ['error', 4],
            'no-trailing-spaces': ['error'],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'linebreak-style': ['error', 'unix'],
            'comma-dangle': ['error', 'never'],
            'object-curly-spacing': ['error', 'always']
        }
    }
]
