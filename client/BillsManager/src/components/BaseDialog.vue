<template>
	<slot name="on" :open="() => (isShowing = true)" />
	<dialog :open="isShowing">
		<div>
			<h1>{{ title }}</h1>
		</div>
		<div>
			<slot name="content" />
		</div>
		<div>
			<button @click="isShowing = false">Close</button>
		</div>
	</dialog>
</template>

<script setup lang="ts">
	import { ref } from '@vue/reactivity'

	defineProps<{ title: string }>()

	const isShowing = ref(false)
</script>
