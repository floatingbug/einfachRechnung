<script setup>
import {Select} from "primevue";


defineProps({
	modelValue: {
		type: String,
		default: "",
	}
})


const emit = defineEmits([ "update:modelValue" ]);


const optionItems = [
	{
		label: "Firma",
		value: "company",
	},
	{
		label: "Privat",
		value: "private",
	},
];

</script>


<template>
	<Select
		:modelValue="modelValue"
		:options="optionItems"
		optionLabel="label"
		optionValue="value"
		@update:modelValue="emit('update:modelValue', $event)"
	/>
</template>


<style lang="scss" scoped>

</style>
