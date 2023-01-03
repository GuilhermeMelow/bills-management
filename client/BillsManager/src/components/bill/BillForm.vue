<template>
	<div>
		<div>
			<label>Descrição</label>
			<input
				v-model="model.description"
				type="text"
				placeholder="Descreva a conta..." />
		</div>
		<div>
			<label>Preço</label>
			<input
				v-model="model.price"
				type="number"
				placeholder="Descreva o valor da conta..." />
		</div>
		<div>
			<label>Data de vencimento</label>
			<BaseDateInput v-model:date="model.validate" />
		</div>
		<button :disabled="loading" @click="$emit('aplied', model)">
			Aplicar
		</button>
	</div>
</template>

<script setup lang="ts">
	import type { BillRequest } from '@/types/bill'
	import { shallowRef, watchEffect } from '@vue/runtime-core'

	import BaseDateInput from '../BaseDateInput.vue'

	interface Props {
		bill?: BillRequest
		loading?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		loading: false,
	})
	defineEmits<{ (e: 'aplied', bill: BillRequest): void }>()

	const model = shallowRef(createBill())

	watchEffect(() => (model.value = createBill(props.bill)))

	function createBill(billRequest?: BillRequest): BillRequest {
		const bill = {
			description: '',
			price: 0,
			validate: new Date(),
		}
		return Object.assign(bill, billRequest)
	}
</script>
