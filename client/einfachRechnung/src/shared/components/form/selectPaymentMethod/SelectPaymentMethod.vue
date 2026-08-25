<script setup>
import { Select } from "primevue";

const model = defineModel({
	type: String,
	default: "",
});

const paymentMethodOptions = [
	{ label: "Überweisung", value: "bank_transfer" },
	{ label: "Barzahlung", value: "cash" },
	{ label: "Kartenzahlung", value: "card" },
	{ label: "Lastschrift", value: "direct_debit" },
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
