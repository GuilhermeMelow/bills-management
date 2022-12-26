<template>
	<div>
		<h1>Contas</h1>
	</div>
	<div v-if="listStatus === 'loading'">...loading</div>
	<div v-else-if="listStatus === 'error'">
		Ocorreu algum erro ao tentar carregar...
	</div>
	<div v-else>
		<button @click="refetch()">Recarregar</button>
		<BaseDialog title="Registrar conta" :is-showing="showDialog ?? false">
			<template #content>
				<BillForm :loading="loadingRegister" @aplied="mutate" />
			</template>
		</BaseDialog>
		<button @click="open()">Abrir</button>
		<BillList
			:bills="bills"
			@clicked="({ id }) => $router.push(`/bill/${id}`)" />
	</div>
</template>

<script setup lang="ts">
	import { BillForm, BillList } from '@/components/bill'
	import { defineAsyncComponent } from '@vue/runtime-core'
	import { useListQuery, useRegisterBill } from '@/composables/queries/bill'
	import { useDialog, useUpdateDialog } from '@/composables/queries/dialog'

	const BaseDialog = defineAsyncComponent(
		() => import('@/components/BaseDialog.vue')
	)

	const { data: bills, status: listStatus, refetch } = useListQuery()
	const { mutate, isLoading: loadingRegister } = useRegisterBill()

	const { data: showDialog } = useDialog()
	const { mutate: open } = useUpdateDialog()
</script>
