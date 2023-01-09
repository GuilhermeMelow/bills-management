<template>
	<div v-if="isLoading">Carregando informações da conta a ser paga...</div>
	<div v-else>
		<p>
			Descrição:
			<span data-testid="description">{{ bill?.description }}</span>
		</p>
		<p>
			Price:
			<span data-testid="price">{{ bill?.price }}</span>
		</p>
		<p>
			Data de vencimento:
			<span data-testid="dueDate">{{ bill?.dueDate }}</span>
		</p>
	</div>
</template>

<script lang="ts" setup>
	import { useFindQuery } from '@/composables/queries/bill'

	const props = defineProps<{ id: string }>()

	const { data: bill, isLoading } = useFindQuery(props.id)
</script>
