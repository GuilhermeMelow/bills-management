<template>
	<div>
		<BillDescriptor :id="id" />
		<BillUpdateDialog :id="id" />
	</div>
</template>

<script setup lang="ts">
	import { BillDescriptor, BillUpdateDialog } from '@/components/bill'

	defineProps<{ id: string }>()
</script>
