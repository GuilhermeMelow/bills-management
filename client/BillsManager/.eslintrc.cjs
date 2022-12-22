/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-recommended',
		'plugin:vuetify/base',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'prettier',
	],
	rules: {
		'eqeqeq': [2, 'smart'],
		'no-console': isProduction ? 2 : 1,
		'no-debugger': isProduction ? 2 : 1,
		'@typescript-eslint/no-unused-vars': 'error',
		'vue/html-self-closing': ['error', {
			'html': {
				'void': 'always',
				'normal': 'always',
				'component': 'always'
			},
			'svg': 'always',
			'math': 'always'
		}],
	},
	env: {
		webextensions: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
	},
}
