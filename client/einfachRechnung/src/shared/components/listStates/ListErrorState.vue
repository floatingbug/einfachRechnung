<script setup>
// Error state for list views with a retry action.
defineProps({
	message: {
		type: String,
		default: "",
	},
});

defineEmits(["retry"]);
</script>

<template>
	<div class="list-error-state">
		<i class="pi pi-exclamation-triangle list-error-state__icon" aria-hidden="true" />

		<p class="list-error-state__title">
			Daten konnten nicht geladen werden
		</p>

		<p class="list-error-state__message">
			{{ message || "Es ist ein unerwarteter Fehler aufgetreten." }}
		</p>

		<Button
			label="Erneut versuchen"
			icon="pi pi-refresh"
			severity="secondary"
			@click="$emit('retry')"
		/>
	</div>
</template>

<style scoped lang="scss">
.list-error-state {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-xl2) var(--space-xl);
	text-align: center;
}

.list-error-state__icon {
	font-size: var(--font-size-2xl);
	color: var(--font-color-danger);
}

.list-error-state__title {
	margin: 0;
	font-size: var(--font-size-lg);
}

.list-error-state__message {
	margin: 0;
	color: var(--font-color-muted);
}
</style>
