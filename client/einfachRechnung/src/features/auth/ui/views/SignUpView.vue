<script setup>
import {useRouter} from "vue-router";
import {useAuthStore} from "../../store";
import {AuthLayout} from "../layouts";
import {SignUpForm} from "../components";
import {useToast} from "primevue/usetoast";


const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();


async function onSubmit(event){
	try{
		await authStore.signUp({
			credentials: event,
		});

		router.push("/auth/verify-email");
	}
	catch {
		toast.add({severity: "error", summary: "Registrierung fehlgeschlagen", detail: "Bitte versuchen Sie es erneut.", life: 5000});
	}
}

</script>


<template>
	<AuthLayout>
		<template #header>
			Registrierung
		</template>

		<template #form>
			<SignUpForm
				@submit="onSubmit"
			/>
		</template>
	</AuthLayout>
</template>


<style scoped lang="scss">

</style>
