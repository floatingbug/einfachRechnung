<script setup>
import {onMounted} from "vue";
import {TaxSettingsForm} from "../components";
import {useSettingsStore} from "../../store/useSettingsStore.js";


const settingsStore = useSettingsStore();


onMounted(async () => {
	await settingsStore.getTax();
});

async function onTaxSettingsFormSubmit(event){
	try{
		settingsStore.updateTax({
			taxSettings: event.data,
		});
	}
	catch(error){
	}
	finally{
	}
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
