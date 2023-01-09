<template>
	<div v-if="listStatus === 'loading'">Carregando as contas...</div>
	<div v-else-if="listStatus === 'error'">
		Ocorreu algum erro ao tentar carregar...
	</div>
	<div>
		<button data-testid="button-reload" @click="refetch()">
			Recarregar
		</button>
		<div data-testid="div-list">
			<li
				v-for="{ id, description } in bills"
				:key="id"
				:data-testId="`item-${id}`"
				@clicked="$router.push(`/bill/${id}`)">
				{{ description }}
			</li>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useListQuery } from '@/composables/queries/bill'

	const { data: bills, status: listStatus, refetch } = useListQuery()
</script>
