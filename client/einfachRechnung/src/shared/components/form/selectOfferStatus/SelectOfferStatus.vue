<script setup>
import {Select} from "primevue";


const props = defineProps({
	modelValue: {
		type: String,
		required: true,
	},
	options: {
		type: Array,
		default: () => [],
	}
});


const emit = defineEmits([ "update:modelValue" ]);


const optionsMap = {
	draft: {
		label: "Entwurf",
		value: "draft",
	},
	sent: {
		label: "Versendet",
		value: "sent",
	},
	accepted: {
		label: "Akzeptiert",
		value: "accepted",
	},
	rejected: {
		label: "Abgelehnt",
		value: "rejected",
	},
	canceled: {
		label: "Stoniert",
		value: "canceled",
	},
	expired: {
		label: "Abgelaufen",
		value: "expired",
	}
};

const options = props.options
	.map(
		action => ({
			label: optionsMap[action].label,
			value: optionsMap[action].value,
		})
	);

</script>


<template>
	<div>
		<Select v-if="options.length > 1"
			:modelValue="modelValue"
			@update:modelValue="emit('update:modelValue', $event)"
			:options="options"
			optionLabel="label"
			optionValue="value"
		/>

		<div v-else>
			{{options[0].label}}
		</div>
	</div>
</template>

<style lang="scss" scoped>

</style>
