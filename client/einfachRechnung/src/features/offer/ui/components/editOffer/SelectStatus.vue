<script setup>
import {computed} from "vue";
import {Select} from "primevue";


const props = defineProps({
	modelValue: {
		type: String,
		required: true,
	},
});


const emit = defineEmits([ "update:modelValue" ]);


const options = computed(
	() => {
		let currOptions = [];

		if(props.modelValue.status=== "draft"){
			currOptions = [
				{
					label: "Storniert",
					value: "cancelled",
				},
			];
		}
		else if(props.modelValue.status === "sent"){
			currOptions = [
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
			]
		}

		return currOptions;
	}
);
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
