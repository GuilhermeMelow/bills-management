import { defineAsyncComponent } from 'vue'

export const BillForm = defineAsyncComponent(
	() => import('@/components/bill/BillForm.vue')
)
export const BillList = defineAsyncComponent(
	() => import('@/components/bill/BillList.vue')
)
