<script setup>
import {onMounted} from "vue";
import {useSettingsStore} from "../../store/useSettingsStore.js";
import {CompanySettingsForm} from "../components";
import { useToast } from "primevue/usetoast";


const toast = useToast();
const settingsStore = useSettingsStore();


onMounted(async () => {
	await settingsStore.findCompany();
});


async function onCompanySettingsFormSubmit(event){
	try{
		const result = await settingsStore.updateCompany({
			data: event.data,
		});


	}
	catch(error){
	}
	finally{
		toast.add({
			severity: "success",
			summary: "Gespeichert",
			detail: "Firmendaten gespeichert",
			life: 5000,
		});
	}
}

</script>


<template>
	<CompanySettingsForm
		:data="settingsStore.company"
		@submit="onCompanySettingsFormSubmit"
	/>
</template>


<style scoped lang="scss">

</style>
