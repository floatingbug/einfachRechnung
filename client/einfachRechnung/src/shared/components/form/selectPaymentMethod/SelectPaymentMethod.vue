<script setup>
import { Select } from "primevue";

const model = defineModel({
	type: String,
	default: "",
});

const paymentMethodOptions = [
	{ label: "Überweisung", value: "bankTransfer" },
	{ label: "Barzahlung", value: "cash" },
	{ label: "Kartenzahlung", value: "card" },
	{ label: "Lastschrift", value: "directDebit" },
	{ label: "PayPal", value: "paypal" },
	{ label: "Sonstige", value: "other" },
];
</script>

<template>
	<Select
		v-model="model"
		:options="paymentMethodOptions"
		optionLabel="label"
		optionValue="value"
		placeholder="Zahlungsart auswählen"
	/>
</template>
