<script setup>
import {OfferSettingsForm} from "../components";
import { PageContainer } from "@/shared/components";
import {useSettingsStore} from "@/features/settings/store/useSettingsStore.js";
import { useToast } from "primevue/usetoast";


const settingsStore = useSettingsStore();
const toast = useToast();


function onOfferSettingsFormAction(event) {
	switch (event.action) {
		case "update":
				updateOffer(event.settings)
			break;

		default:
			break;
	}
}

async function updateOffer(settings) {
	try {
		settingsStore.updateOffer({
			offerSettings: settings,
		});
		toast.add({
			severity: "success",
			summary: "Gespeichert",
			detail: "Angebotseinstellungen wurden gespeichert.",
			life: 5000
		});
	}
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Angebotseinstellungen wurden nicht geändert.",
			life: 5000
		});

		return;
	}
}

</script>


<template>
	<PageContainer>
		<template #header>
			Angebotseinstellungen
		</template>

		<OfferSettingsForm
			@action="onOfferSettingsFormAction"
		/>
	</PageContainer>
</template>


<style lang="scss" scoped>
</style>
