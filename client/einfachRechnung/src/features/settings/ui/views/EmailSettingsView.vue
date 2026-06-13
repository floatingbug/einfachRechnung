<script setup>
import {onMounted} from "vue";
import {EmailSettingsForm} from "../components";
import {useSettingsStore} from "../../store/useSettingsStore.js";
import { useToast } from "primevue/usetoast";


const toast = useToast();
const settingsStore = useSettingsStore();


onMounted(async () => {
	await settingsStore.findEmail();
});

async function onEmailSettingsFormSubmit(event){
	try{
		await settingsStore.updateEmail({data: event.data});
	}
	catch(error){
	}
	finally{
		toast.add({
			severity: "success",
			summary: "Gespeichert",
			detail: "Emaildaten gespeichert",
			life: 5000,
		});
	}
}

</script>


<template>
	<EmailSettingsForm
		:data="settingsStore.email"
		@submit="onEmailSettingsFormSubmit"
	/>
</template>


<style scoped lang="scss">

</style>
