<script setup>
import {Teleport, useSlots} from "vue";
import ProgressSpinner from 'primevue/progressspinner';


defineProps(
	{
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
);


const slots = useSlots();

</script>


<template>
	<div class="page-container">
		<h1 v-if="slots.header">
			<slot name="header"></slot>
		</h1>

		<slot></slot>

		<div class="paginator">
			<slot name="paginator">
			</slot>
		</div>

		<Teleport to="body" v-if="isLoading">
			<div class="progress-spinner">
				<ProgressSpinner aria-label="loading" />
			</div>
		</Teleport>
	</div>
</template>


<style lang="scss" scoped>
.page-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--space-xl);
}

h1 {
	margin-bottom: var(--space-xl2);
}

.paginator {
	width: 100%;
	margin-top: var(--space-xl);
}

.progress-spinner {
	width: 100%;
	height: 100dvh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--modal-bg-color);
	z-index: var(--z-modal);
}
</style>
