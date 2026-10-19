<script setup>
import Tag from "primevue/tag";

defineProps({
	label: { type: String, required: true },
	// PrimeVue-Severity: success | info | warn | danger | secondary | contrast
	severity: { type: String, default: "secondary" },
});
</script>

<template>
	<Tag :value="label" :severity="severity" rounded />
</template>
