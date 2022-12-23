<template>
	<div v-if="isLoading">Carregando informações da conta a ser paga...</div>
	<div v-else>
		<p>Descrição: {{ bill?.description }}</p>
		<p>Price: {{ bill?.price }}</p>
		<p>Data de vencimento: {{ bill?.validate }}</p>
		<BaseDialog
			title="Atualizar informações da Conta"
			:is-showing="showDialog">
			<template #content>
				<BillForm :bill="bill" @aplied="mutate" />
			</template>
		</BaseDialog>
		<button @click="open">Atualizar informações</button>
	</div>
</template>

<script setup lang="ts">
	import BaseDialog from '@/components/BaseDialog.vue'
	import { BillForm } from '@/components/bill'
	import { useFindQuery, useUpdateQuery } from '@/composables/queries/bill'
	import { ref } from '@vue/reactivity'

	const props = defineProps<{
		id: string
	}>()

	const { data: bill, isLoading } = useFindQuery(props.id)
	const { mutate } = useUpdateQuery(props.id)

	const showDialog = ref(false)
	const open = () => {
		showDialog.value = !showDialog.value
	}
</script>
