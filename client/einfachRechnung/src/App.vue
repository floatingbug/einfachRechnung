<script setup>
import {onMounted} from "vue";
import {useAuthStore} from "./features/auth/store";
import Toast from "primevue/toast";


const authStore = useAuthStore();


onMounted(async () => {
	try{
		await authStore.refresh();
	}
	catch(error){
		router.push("/auth/sign-in");
	}
});

</script>

<template>
	<Teleport to="body">
		<Toast position="top-right" />
	</Teleport>

	<RouterView />
</template>

<style scoped></style>
