<script setup>
import Drawer from "primevue/drawer";

const visible = defineModel();
</script>

<template>
	<Drawer
		v-model:visible="visible"
		position="full"
	>
		<div class="content-wrapper">
			<div class="content">
				<slot />
			</div>
		</div>
	</Drawer>
</template>


<style scoped lang="scss">
.content-wrapper {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
};

.content {
	width: 90%;
	max-width: 1200px;
}
</style>
