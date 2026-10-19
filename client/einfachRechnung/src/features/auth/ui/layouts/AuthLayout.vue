<script setup>
import Card from "primevue/card";
import ProgressSpinner from 'primevue/progressspinner';
import {Logo} from "@/shared/components";


defineProps(
	{
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
);

</script>


<template>
	<div class="auth-layout">
		<div class="auth-content">
			<Card>
				<template #title>
					<Logo />
					<slot name="header" />
				</template>

				<template #content>
					<div class="form">
						<slot name="form" />
					</div>
				</template>
			</Card>
		</div>
	</div>

	<Teleport to="body" v-if="isLoading">
		<div class="progress-spinner">
			<ProgressSpinner aria-label="loading" />
		</div>
	</Teleport>
</template>


<style scoped lang="scss">
.auth-layout {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.auth-content {
	width: 90%;
	max-width: 800px;
}

.form {
	margin-top: var(--space-xl2);
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
