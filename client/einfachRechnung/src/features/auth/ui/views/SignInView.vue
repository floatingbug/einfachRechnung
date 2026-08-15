<script setup>
import {useRouter} from "vue-router";
import {useAuthStore} from "../../store";
import {AuthLayout} from "../layouts";
import {SignInForm} from "../components";
import {useToast} from "primevue/usetoast";


const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();


async function onSubmit(event){
	try{
		await authStore.signIn({
			credentials: event,
		});

		router.push("/");
	}
	catch {
		toast.add({severity: "error", summary: "Anmeldung fehlgeschlagen", detail: "Bitte prüfen Sie Ihre Zugangsdaten.", life: 5000});
	}
}

</script>


<template>
	<AuthLayout>
		<template #header>
			Anmeldung
		</template>

		<template #form>
			<SignInForm
				@submit="onSubmit"
			/>
		</template>
	</AuthLayout>
</template>


<style scoped lang="scss">

</style>
