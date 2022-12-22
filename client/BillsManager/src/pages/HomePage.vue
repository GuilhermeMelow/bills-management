<template>
	<div>
		<h1>Contas</h1>
	</div>
	<div v-if="loadingList">...loading</div>
	<div v-else-if="isError">Ocorreu algum erro ao tentar carregar...</div>
	<div v-else>
		<button @click="refetch()">Recarregar</button>
		<BaseDialog title="Registrar conta">
			<template #on="{ open }">
				<button @click="open">Abrir</button>
			</template>
			<template #content>
				<BillForm :loading="loadingRegister" @aplied="register" />
			</template>
		</BaseDialog>
		<BillList
			:bills="bills"
			@clicked="({ id }) => $router.push(`/bill/${id}`)" />
	</div>
</template>

<script setup lang="ts">
	import type { BillRequest } from '@/types/bill'
	import { BillForm, BillList } from '@/components/bill'
	import { defineAsyncComponent } from '@vue/runtime-core'
	import { useListQuery, useRegisterBill } from '@/composables/queries/bill'

	const BaseDialog = defineAsyncComponent(
		() => import('@/components/BaseDialog.vue')
	)

	const {
		data: bills,
		isLoading: loadingList,
		isError,
		refetch,
	} = useListQuery()
	const { mutateAsync, isLoading: loadingRegister } = useRegisterBill()

	const register = async (bill: BillRequest) => {
		await mutateAsync(bill)
		refetch.value()
	}
</script>

<style></style>
