import { defineAsyncComponent } from 'vue'

export const BillForm = defineAsyncComponent(
	() => import('@/components/bill/BillForm.vue')
)
export const BillList = defineAsyncComponent(
	() => import('@/components/bill/BillList.vue')
)

export const BillDescriptor = defineAsyncComponent(
	() => import('@/components/bill/BillDescriptor.vue')
)
