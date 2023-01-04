<template>
	<div>
		<p>Descrição: {{ bill?.description }}</p>
		<p>Price: {{ bill?.price }}</p>
		<p>Data de vencimento: {{ bill?.validate }}</p>
	</div>
</template>

<script lang="ts" setup>
	import type { Bill } from '@/types/bill'

	defineProps<{ bill?: Bill }>()
</script>
