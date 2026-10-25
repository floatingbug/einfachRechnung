<script setup>
// Empty state for list views. Optionally shows an action button
// (e.g. "create new entry") via the actionLabel prop.
defineProps({
	title: {
		type: String,
		default: "Keine Einträge gefunden",
	},
	message: {
		type: String,
		default: "",
	},
	actionLabel: {
		type: String,
		default: "",
	},
});

defineEmits(["action"]);
</script>

<template>
	<div class="list-empty-state">
		<i class="pi pi-inbox list-empty-state__icon" aria-hidden="true" />

		<p class="list-empty-state__title">
			{{ title }}
		</p>

		<p
			v-if="message"
			class="list-empty-state__message"
		>
			{{ message }}
		</p>

		<Button
			v-if="actionLabel"
			class="list-empty-state__action"
			:label="actionLabel"
			icon="pi pi-plus"
			@click="$emit('action')"
		/>
	</div>
</template>

<style scoped lang="scss">
.list-empty-state {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-sm);
	padding: var(--space-xl2) var(--space-xl);
	text-align: center;
}

.list-empty-state__icon {
	font-size: var(--font-size-2xl);
	color: var(--font-color-muted);
}

.list-empty-state__title {
	margin: 0;
	font-size: var(--font-size-lg);
}

.list-empty-state__message {
	margin: 0;
	color: var(--font-color-muted);
}

.list-empty-state__action {
	margin-top: var(--space-md);
}
</style>
