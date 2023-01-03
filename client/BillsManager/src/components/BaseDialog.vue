<template>
	<slot name="on" />
	<dialog :open="isShowing">
		<div>
			<h1>{{ title }}</h1>
		</div>
		<div>
			<slot name="content" />
		</div>
		<div></div>
	</dialog>
</template>

<script setup lang="ts">
	defineProps<{ title: string; isShowing: boolean }>()
</script>
