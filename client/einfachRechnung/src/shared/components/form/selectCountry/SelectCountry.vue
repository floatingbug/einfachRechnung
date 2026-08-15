<script setup>
import {ref, watch} from "vue";
import Select from "primevue/select";


const emit = defineEmits([ "newCountryCode" ]);


const selectedCountryCode = ref("DE");
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


watch(selectedCountryCode, () => {
	emit("newCountryCode", selectedCountryCode.value);
})

</script>


<template>
	<div class="select-country">
		<Select
			v-model="selectedCountryCode"
			:options="countryCodes"
			optionLabel="label"
			optionValue="value"
		/>
	</div>
</template>


<style lang="scss" scoped>

</style>
