<template>
	<input v-model="displayValue" type="date" />
</template>

<script setup lang="ts">
	import { computed, toRefs } from '@vue/reactivity'
	import { format, parse } from 'date-fns'

	const emit = defineEmits(['update:date'])

	const props = defineProps({
		date: {
			type: Date,
			default: new Date(),
		},
	})
	const { date } = toRefs(props)

	const dateFormat = 'yyyy-MM-dd'
	const displayValue = computed({
		get: () => {
			return format(date.value, dateFormat)
		},
		set: (dateRaw) => {
			if (!dateRaw) return

			emit('update:date', parse(dateRaw, dateFormat, new Date()))
		},
	})
</script>
