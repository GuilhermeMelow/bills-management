import { ref } from '@vue/runtime-dom'
import { defineStore } from 'pinia'

export const useDialog = defineStore('dialog', {
	state: () => ({
		isShowing: false,
	}),
	actions: {
		open() {
			this.isShowing = !this.isShowing
		},
	},
})
