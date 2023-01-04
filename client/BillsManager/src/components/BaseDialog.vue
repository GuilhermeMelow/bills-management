<template>
	<slot name="on" :open="open" />
	<dialog :open="isShowing">
		<div v-if="loading">
			<slot name="loading">Carregando informações...</slot>
		</div>
		<div v-else>
			<div>
				<h1>{{ title }}</h1>
			</div>
			<div>
				<slot name="content">Sem conteúdo...</slot>
			</div>
		</div>
	</dialog>
</template>

<script setup lang="ts">
	import { ref } from '@vue/reactivity'

	withDefaults(defineProps<{ title: string; loading?: boolean }>(), {
		loading: false,
	})

	const isShowing = ref(false)

	const open = () => {
		isShowing.value = !isShowing.value
	}
</script>
