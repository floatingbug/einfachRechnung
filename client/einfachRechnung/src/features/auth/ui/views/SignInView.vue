<script setup>
import {useRouter} from "vue-router";
import {useAuthStore} from "../../store";
import {AuthLayout} from "../layouts";
import {SignInForm} from "../components";


const authStore = useAuthStore();
const router = useRouter();


async function onSubmit(event){
	try{
		const result = await authStore.signIn({
			credentials: event,
		});

		router.push("/");
	}
	catch(error){
		console.log("--->", error);
		console.log(error.response.data);
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
