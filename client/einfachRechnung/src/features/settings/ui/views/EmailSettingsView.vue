<script setup>
import {onMounted} from "vue";
import {EmailSettingsForm} from "../components";
import {useSettingsStore} from "../../store/useSettingsStore.js";
import { useToast } from "primevue/usetoast";
import { PageContainer } from "@/shared/components";


const toast = useToast();
const settingsStore = useSettingsStore();


onMounted(async () => {
	await settingsStore.getEmail();
});

async function onEmailSettingsFormSubmit(event){
	try{
		await settingsStore.updateEmail({emailSettings: event.data});

		toast.add({
			severity: "success",
			summary: "Gespeichert",
			detail: "Emaildaten gespeichert",
			life: 5000,
		});
	}
	catch {
		toast.add({severity: "error", summary: "Fehler", detail: "E-Mail-Daten konnten nicht gespeichert werden.", life: 5000});
		return;
	}
}

</script>


<template>
	<PageContainer>
		<template #header>
			E-Mail Einstellungen
		</template>

		<EmailSettingsForm
			:data="settingsStore.email"
			@submit="onEmailSettingsFormSubmit"
		/>
	</PageContainer>
</template>


<style scoped lang="scss">

</style>
