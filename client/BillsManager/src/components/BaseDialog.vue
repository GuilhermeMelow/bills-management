<template>
	<slot name="on" :open="open" />
	<dialog :open="isShowing">
		<div>
			<h1>{{ title }}</h1>
		</div>
		<div>
			<slot name="content" />
		</div>
	</dialog>
</template>

<script setup lang="ts">
	import { ref } from '@vue/reactivity'

	defineProps<{ title: string }>()

	const isShowing = ref(false)

	const open = () => {
		isShowing.value = !isShowing.value
	}
</script>
