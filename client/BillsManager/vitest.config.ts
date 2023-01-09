import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	test: {
		exclude: [...configDefaults.exclude, 'packages/template/*'],
		globals: true,
		environment: 'happy-dom',
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	plugins: [vue()],
})
