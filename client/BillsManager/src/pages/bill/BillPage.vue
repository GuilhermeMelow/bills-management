<template>
	<div v-if="status === 'loading'">
		Carregando informações da conta a ser paga...
	</div>
	<div v-else-if="status === 'error'">
		<h1>Ops...</h1>
		<span>
			Ocorreu algum erro ao tentar carregar a sua informação, peço que
			retorne para a tela principal...
		</span>
		<button @click="$router.push('/')">Retornar</button>
	</div>
	<div v-else>
		<p>Descrição: {{ bill?.description }}</p>
		<p>Price: {{ bill?.price }}</p>
		<p>Data de vencimento: {{ bill?.validate }}</p>
		<BaseDialog title="Atualizar informações da Conta">
			<template #on="{ open }">
				<button @click="open()">Atualizar informações</button>
			</template>
			<template #content>
				<BillForm :bill="bill" @aplied="mutate" />
			</template>
		</BaseDialog>
	</div>
</template>

<script setup lang="ts">
	import BaseDialog from '@/components/BaseDialog.vue'
	import { BillForm } from '@/components/bill'
	import { useFindQuery, useUpdateQuery } from '@/composables/queries/bill'

	const props = defineProps<{
		id: string
	}>()

	const { data: bill, status } = useFindQuery(props.id)
	const { mutate } = useUpdateQuery(props.id)
</script>
