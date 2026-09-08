<script setup>
const emit = defineEmits(["action"]);

function onModalClick(){
	emit("action", {
		action: "modalClicked"
	})
}

</script>


<template>
	<div class="modal"
		@click="onModalClick"
	>

	</div>
</template>


<style lang="scss" scoped>
.modal {
	width: 100%;
	height: 100dvh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: var(--modal-bg-color);
	z-index: var(--z-modal);
}
</style>
