<script setup>
import {onMounted} from "vue";
import {TaxSettingsForm} from "../components";
import {useSettingsStore} from "../../store/useSettingsStore.js";


const settingsStore = useSettingsStore();


onMounted(async () => {
	await settingsStore.getTax();
});

async function onTaxSettingsFormSubmit(event){
	await settingsStore.updateTax({taxSettings: event.data});
}

</script>


<template>
	<TaxSettingsForm
		:data="settingsStore.tax"
		@submit="onTaxSettingsFormSubmit"
	/>
</template>


<style scoped lang="scss">

</style>
