
module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    plugins: ['react', 'prettier', 'prettier/prettier'],
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:security/recommended',
        'plugin:react-hooks/recommended'
    ],
    rules: {
        // 'prettier/prettier': 0,

        // 'react-hooks/exhaustive-deps': 0,

        // 'linebreak-style': 0,

        // 'no-var': 1,

        // 'no-console': 1,

        // 'no-dupe-keys': 2,

        // semi: [2, 'always'],

        // quotes: [2, 'single'],

        // 'no-empty': [2, { allowEmptyCatch: true }],

        // indent: [
        //     1,
        //     2,
        //     {
        //         SwitchCase: 1,
        //         MemberExpression: 1,
        //         ArrayExpression: 1,
        //         ObjectExpression: 1,
        //         ImportDeclaration: 1,
        //         FunctionDeclaration: { parameters: 'first' }
        //     }
        // ],

        // eqeqeq: [2, 'smart'],

        // 'comma-dangle': [
        //     1,
        //     {
        //         arrays: 'never',
        //         objects: 'never',
        //         imports: 'never',
        //         exports: 'never',
        //         functions: 'never'
        //     }
        // ],

        // 'jsx-quotes': [2, 'prefer-double'],

        // 'no-trailing-spaces': [1, { ignoreComments: true }],

        // 'require-await': 2,

        // 'no-unused-vars': [1, { ignoreRestSiblings: true }],

        // 'key-spacing': [
        //     1,
        //     {
        //         beforeColon: false,
        //         afterColon: true,
        //         align: 'value'
        //     }
        // ],

        // 'block-spacing': 1,

        // 'arrow-spacing': [1, { before: true, after: true }],

        // 'object-curly-spacing': [1, 'always']
    }
}
