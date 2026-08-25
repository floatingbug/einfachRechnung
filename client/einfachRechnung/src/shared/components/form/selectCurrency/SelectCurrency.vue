<script setup>
import {ref} from "vue";
import { Select } from "primevue";


const model = defineModel({
	type: String,
	default: "",
});


const currencyOptions = ref([
	{ label: "Euro (EUR)", value: "EUR" },
	{ label: "Schweizer Franken (CHF)", value: "CHF" },
	{ label: "US-Dollar (USD)", value: "USD" },
	{ label: "Britisches Pfund (GBP)", value: "GBP" },
]);

</script>

<template>
	<div>
		<Select
			v-model="model"
			:options="currencyOptions"
			optionLabel="label"
			optionValue="value"
		/>
	</div>
</template>

<style lang="scss" scoped>
</style>
