<template>
	<BaseDialog title="Atualizar informações da Conta" :loading="isLoading">
		<template #on="{ open }">
			<button @click="open()">Atualizar informações</button>
		</template>
		<template #content>
			<BillForm :bill="bill" @aplied="mutate" />
		</template>
		<template #loading>
			<div>Carregando informações da conta à serem atualizadas...</div>
		</template>
	</BaseDialog>
</template>

<script setup lang="ts">
	import { useFindQuery, useUpdateQuery } from '@/composables/queries/bill'
	import { BillForm } from '.'

	import BaseDialog from '../BaseDialog.vue'

	const props = defineProps<{ id: string }>()

	const { data: bill, isLoading } = useFindQuery(props.id)
	const { mutate } = useUpdateQuery(props.id)
</script>
