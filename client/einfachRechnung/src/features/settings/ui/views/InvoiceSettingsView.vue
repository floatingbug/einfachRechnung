<script setup>
import {onMounted} from "vue";
import {InvoiceSettingsForm} from "../components";
import {useSettingsStore} from "../../store/useSettingsStore.js";
import { useToast } from "primevue/usetoast";
import { PageContainer } from "@/shared/components";


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

		toast.add({
			severity: "success",
			summary: "Gespeichert",
			detail: "Emaildaten gespeichert",
			life: 5000,
		});
	}
	catch {
		toast.add({severity: "error", summary: "Fehler", detail: "Rechnungseinstellungen konnten nicht gespeichert werden.", life: 5000});
		return;
	}
}

</script>


<template>
	<PageContainer>
		<template #header>
			Rechnungseinstellungen
		</template>

		<InvoiceSettingsForm
			:data="settingsStore.invoice"
			@submit="onInvoiceSettingsFormSubmit"
		/>
	</PageContainer>
</template>


<style scoped lang="scss">

</style>
