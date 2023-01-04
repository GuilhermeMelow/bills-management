<template>
	<div v-if="isLoading">Carregando informações da conta a ser paga...</div>
	<div v-else>
		<p>Descrição: {{ bill?.description }}</p>
		<p>Price: {{ bill?.price }}</p>
		<p>Data de vencimento: {{ bill?.validate }}</p>
	</div>
</template>

<script lang="ts" setup>
	import { useFindQuery } from '@/composables/queries/bill'

	const props = defineProps<{ id: string }>()

	const { data: bill, isLoading } = useFindQuery(props.id)
</script>
