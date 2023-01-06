<template>
	<form @submit.prevent>
		<div>
			<label>Descrição</label>
			<input
				v-model="model.description"
				type="text"
				placeholder="Descreva a conta..."
				data-testid="input-descricao" />
		</div>
		<div>
			<label>Preço</label>
			<input
				v-model="model.price"
				type="number"
				placeholder="Descreva o valor da conta..."
				data-testid="input-preco" />
		</div>
		<div>
			<label>Data de vencimento</label>
			<input
				v-model="model.dueDate"
				type="number"
				placeholder="Coloquei um número entre 0 a 20..."
				data-testid="input-vencimento" />
		</div>
		<button
			:disabled="loading"
			data-testid="button-apply"
			@click="$emit('applied', model)">
			Aplicar
		</button>
	</form>
</template>

<script setup lang="ts">
	import { createBill, type BillRequest } from '@/types/bill'
	import { shallowRef, watchEffect } from '@vue/runtime-core'

	interface Props {
		bill?: BillRequest
		loading?: boolean
	}
	const props = withDefaults(defineProps<Props>(), {
		loading: false,
	})
	defineEmits<{ (e: 'applied', bill: BillRequest): void }>()

	const model = shallowRef(createBill())

	watchEffect(() => (model.value = createBill(props.bill)))
</script>
