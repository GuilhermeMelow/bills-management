<template>
	<div v-if="isLoading">Carregando informações da conta a ser paga...</div>
	<div v-else>
		<p>Descrição: {{ bill?.description }}</p>
		<p>Price: {{ bill?.price }}</p>
		<p>Data de vencimento: {{ bill?.validate }}</p>
		<BaseDialog title="Atualizar informações da Conta">
			<template #on="{ open }">
				<button @click="open">Atualizar informações</button>
			</template>
			<template #content>
				<BillForm :bill="bill" @aplied="update" />
			</template>
		</BaseDialog>
	</div>
</template>

<script setup lang="ts">
	import BaseDialog from '@/components/BaseDialog.vue'
	import { BillForm } from '@/components/bill'
	import type { BillRequest } from '@/types/bill'
	import { useFindQuery, useUpdateQuery } from '@/composables/queries/bill'

	const props = defineProps<{
		id: string
	}>()

	const { data: bill, isLoading, refetch } = useFindQuery(props.id)
	const { mutateAsync } = useUpdateQuery()

	const update = async (request: BillRequest) => {
		await mutateAsync({ id: props.id, ...request })
		refetch.value()
	}
</script>
