import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/pages/HomePage.vue'),
		},
		{
			path: '/bill/:id',
			name: 'bill',
			component: () => import('@/pages/bill'),
			props: (route) => ({ id: route.params.id }),
		},
	],
})

export default router
