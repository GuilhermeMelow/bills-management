import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import type { VueQueryPluginOptions } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

const vueQueryPluginOptions: VueQueryPluginOptions = {
	queryClientConfig: {
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	},
}

createApp(App)
	.use(createPinia())
	.use(router)
	.use(VueQueryPlugin, vueQueryPluginOptions)
	.mount('#app')
