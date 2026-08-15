<script setup>
import {onMounted} from "vue";
import {InvoiceSettingsForm} from "../components";
import {useSettingsStore} from "../../store/useSettingsStore.js";
import { useToast } from "primevue/usetoast";


const toast = useToast();
const settingsStore = useSettingsStore();


onMounted(async () => {
	await settingsStore.getInvoice();
});

async function onInvoiceSettingsFormSubmit(event){
	try{
		await settingsStore.updateInvoice({
			invoiceSettings: event.data,
		});
	}
	catch {
		toast.add({severity: "error", summary: "Fehler", detail: "Rechnungseinstellungen konnten nicht gespeichert werden.", life: 5000});
		return;
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
