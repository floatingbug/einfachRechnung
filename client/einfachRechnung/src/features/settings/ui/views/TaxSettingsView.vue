<script setup>
import {onMounted} from "vue";
import {TaxSettingsForm} from "../components";
import {useSettingsStore} from "../../store/useSettingsStore.js";


const settingsStore = useSettingsStore();


onMounted(async () => {
	await settingsStore.findTax();
});

async function onTaxSettingsFormSubmit(event){
	try{
		settingsStore.updateTax({
			data: event.data,
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
