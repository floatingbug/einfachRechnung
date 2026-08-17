<script setup>
import {onMounted} from "vue";
import {TaxSettingsForm} from "../components";
import {useSettingsStore} from "../../store/useSettingsStore.js";
import { PageContainer } from "@/shared/components";
import { useToast } from "primevue/usetoast";


const settingsStore = useSettingsStore();
const toast = useToast();


onMounted(async () => {
	await settingsStore.getTax();
});

async function onTaxSettingsAction(event){
	switch (event.action) {
		case "update":
				updateTax(event.taxSettings);
			break;

		default:
			break;
	}
}


async function updateTax(taxSettings) {
	try {
		await settingsStore.updateTax({
			taxSettings,
		});

		toast.add({
			severity: "success",
			summary: "Gespeichert",
			detail: "Steuereinstellungen wurden geändert.",
			life: 5000,
		});
	} catch {

		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Steuereinstellungen konnten nicht gespeichert werden.",
			life: 5000
		});
	}
}

</script>


<template>
	<PageContainer>
		<template #header>
			Einstellung Steuer
		</template>

		<TaxSettingsForm
			:data="settingsStore.tax"
			@action="onTaxSettingsAction"
		/>
	</PageContainer>
</template>


<style scoped lang="scss">

</style>
