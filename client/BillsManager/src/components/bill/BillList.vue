<template>
	<li v-for="bill in bills" :key="bill.id" @click="$emit('clicked', bill)">
		{{ bill.description }}
	</li>
</template>

<script setup lang="ts">
	import type { Bill } from '@/types/bill'

	interface Props {
		bills?: Bill[]
	}

	withDefaults(defineProps<Props>(), {
		bills: () => [],
	})

	defineEmits<{
		(e: 'clicked', bill: Bill): void
	}>()
</script>
