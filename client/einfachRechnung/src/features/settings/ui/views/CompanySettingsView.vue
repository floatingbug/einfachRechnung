<script setup>
import {onMounted} from "vue";
import {useSettingsStore} from "../../store/useSettingsStore.js";
import {CompanySettingsForm} from "../components";
import { useToast } from "primevue/usetoast";
import {PageContainer} from "@/shared/components";


const toast = useToast();
const settingsStore = useSettingsStore();


onMounted(async () => {
	await settingsStore.getCompany();
});


async function onCompanySettingsFormSubmit(event){
	try{
		await settingsStore.updateCompany({
			company: event.data,
		});

		toast.add({
			severity: "success",
			summary: "Gespeichert",
			detail: "Firmendaten gespeichert",
			life: 5000,
		});
	}
	catch{
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Firmendaten konnten nicht gespeichert werden.",
			life: 5000
		});

		return;
	}
}

</script>


<template>
	<PageContainer>
		<template #header>
			Firmeneinstellungen
		</template>

		<CompanySettingsForm
			:data="settingsStore.company"
			@submit="onCompanySettingsFormSubmit"
		/>
	</PageContainer>
</template>


<style scoped lang="scss">
</style>
