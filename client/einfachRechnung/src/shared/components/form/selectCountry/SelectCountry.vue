<script setup>
import {ref} from "vue";
import Select from "primevue/select";


defineProps({
	modelValue: {
		type: String,
	}
});


const emit = defineEmits([ "update:modelValue" ]);


const countryCodes = ref([
	{
		label: "Deutschland",
		value: "DE"
	},
	{
		label: "England",
		value: "E"
	},
]);

</script>


<template>
	<div class="select-country">
		<Select
			:modelValue="modelValue"
			:options="countryCodes"
			optionLabel="label"
			optionValue="value"
			@update:modelValue="emit('update:modelValue', $event)"
		/>
	</div>
</template>


<style lang="scss" scoped>

</style>
