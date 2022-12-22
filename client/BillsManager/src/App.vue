<template>
	<header>
		<nav>
			<RouterLink to="/">Home</RouterLink>
		</nav>
	</header>
	<body>
		<RouterView />
	</body>
</template>

<script setup lang="ts">
	import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
