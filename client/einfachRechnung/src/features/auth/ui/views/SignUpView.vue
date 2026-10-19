<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "../../store";
import {AuthLayout} from "../layouts";
import {SignUpForm} from "../components";
import {useToast} from "primevue/usetoast";


const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const errors = ref();
const isLoading = ref(false);


async function onSubmit(event){
	isLoading.value = true;

	try{
		await authStore.signUp({
			credentials: event,
		});

		router.push("/auth/verify-email");
	}
	catch(error) {
		if(error.response?.data?.inputErrors){
			errors.value = error.response.data.inputErrors;
		}
		else if(error.response?.data?.message){
			errors.value = {
				otherError: error.response.data.message,
			};
		}
		else{
			toast.add({
				severity: "error",
				summary: "Registrierung fehlgeschlagen",
				detail: "Bitte versuchen Sie es erneut.",
				life: 5000,
			});
		}
	}
	finally{
		isLoading.value = false;
	}
}

</script>


<template>
	<AuthLayout
		:isLoading="isLoading"
	>
		<template #header>
			Registrierung
		</template>

		<template #form>
			<SignUpForm
				:errors="errors"
				@clearError="errors[$event] = []; errors.otherError = ''"
				@submit="onSubmit"
			/>
		</template>
	</AuthLayout>
</template>


<style scoped lang="scss">

</style>
