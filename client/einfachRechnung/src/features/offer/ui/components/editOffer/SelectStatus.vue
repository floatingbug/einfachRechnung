<script setup>
import {ref} from "vue";
import {Select} from "primevue";


defineProps({
	modelValue: {
		type: String,
		required: true,
	}
});


const emit = defineEmits([ "update:modelValue" ]);


const options = ref([
	{
		label: "Angenommen",
		value: "accepted",
	},
	{
		label: "Abgelehnt",
		value: "rejected",
	},
	{
		label: "Storniert",
		value: "cancelled",
	},
]);

</script>


<template>
	<div>
		<Select
			:modelValue="modelValue"
			@update:modelValue="emit('update:modelValue', $event)"
			:options="options"
			optionLabel="label"
			optionValue="value"
		/>
	</div>
</template>

<style lang="scss" scoped>

</style>
