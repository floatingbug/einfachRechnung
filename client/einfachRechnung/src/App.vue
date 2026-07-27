<script setup>
import Toast from "primevue/toast";

</script>

<template>
	<Teleport to="body">
		<Toast position="top-right" />
	</Teleport>

	<div class="test"></div>

	<RouterView />
</template>

<style scoped>
</style>
