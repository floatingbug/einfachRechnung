<script setup>
import {onMounted} from "vue";
import {InvoiceSettingsForm} from "../components";
import {useSettingsStore} from "../../store/useSettingsStore.js";
import { useToast } from "primevue/usetoast";


const toast = useToast();
const settingsStore = useSettingsStore();


onMounted(async () => {
	await settingsStore.findInvoice();
});

async function onInvoiceSettingsFormSubmit(event){
	try{
		await settingsStore.updateInvoice({
			data: event.data,
		});
	}
	catch(error){
		console.log(error);
	}
	finally{
		toast.add({
			severity: "success",
			summary: "Gespeichert",
			detail: "Rechnungseinstellungen gespeichert",
			life: 5000,
		});
	}
}

</script>


<template>
	<InvoiceSettingsForm
		:data="settingsStore.invoice"
		@submit="onInvoiceSettingsFormSubmit"
	/>
</template>


<style scoped lang="scss">

</style>
