<script setup>
	import Toast from "primevue/toast";
</script>

<template>
	<Teleport to="body">
		<Toast position="top-right" />
	</Teleport>

	<RouterView />
</template>

<style scoped></style>
