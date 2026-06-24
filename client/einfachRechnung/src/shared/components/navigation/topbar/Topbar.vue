<script setup>
import {useRouter} from "vue-router";
import { ref } from 'vue';
import Toolbar from 'primevue/toolbar';
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import SplitButton from "primevue/splitbutton";
import {UserMenu} from "./components";
import {useAuthStore} from "@/features/auth/store";


const authStore = useAuthStore();
const router = useRouter();


async function onUserMenuActions(event){
	switch(event.action){
		case "signOut" :
			try{
				await authStore.signOut();
			}
			catch(error){
				console.log("--->", error);
			}
			finally{
				router.push("/auth/sign-in");
			}
		break;
	}
}

</script>


<template>
	<Toolbar
		:pt="{
			root: {
				style: {
					border: 'none',
				},
			},
		}"
	>
		<template #start>
		</template>

		<template #center>
		</template>

		<template #end>
			<div class="auth-buttons-container" v-if="!authStore.isAuthenticated">
				<Button
					label="Anmelden"
					as="router-link"
					to="/auth/sign-in"
					severity="secondary"
				/>

				<Button
					label="Registrieren"
					as="router-link"
					to="/auth/sign-up"
				/>
			</div>

			<div class="user-menu-container" v-if="authStore.isAuthenticated">
				<UserMenu
					@userMenu:action="onUserMenuActions"
				/>
			</div>
		</template>
	</Toolbar>
</template>


<style scoped lang="scss">
.auth-buttons-container {
	display: flex;
	gap: var(--space-md);

	.p-button {
		text-decoration: none;
	}
}
</style>
