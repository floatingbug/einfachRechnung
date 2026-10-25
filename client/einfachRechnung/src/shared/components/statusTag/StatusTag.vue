<script setup>
import Tag from "primevue/tag";

// Renders a status label as a colored PrimeVue tag.
// Label and severity are provided by the feature's status map.
defineProps({
	label: {
		type: String,
		required: true,
	},
	severity: {
		type: String,
		default: "secondary",
	},
});
</script>

<template>
	<Tag :value="label" :severity="severity" />
</template>
