<template>
	<div>
		<h1>Contas</h1>
	</div>
	<div>
		<BaseDialog title="Registrar conta">
			<template #on="{ open }">
				<button @click="open">Abrir</button>
			</template>
			<template #content>
				<BillForm :loading="loadingRegister" @aplied="mutate" />
			</template>
		</BaseDialog>

		<BillList />
	</div>
</template>

<script setup lang="ts">
	import { BillForm, BillList } from '@/components/bill'
	import { defineAsyncComponent } from '@vue/runtime-core'
	import { useRegisterBill } from '@/composables/queries/bill'

	const BaseDialog = defineAsyncComponent(
		() => import('@/components/BaseDialog.vue')
	)

	const { mutate, isLoading: loadingRegister } = useRegisterBill()
</script>
