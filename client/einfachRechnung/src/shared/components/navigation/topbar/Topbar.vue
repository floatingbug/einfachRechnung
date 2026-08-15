<script setup>
import {useRouter} from "vue-router";
import Toolbar from 'primevue/toolbar';
import {UserMenu} from "./components";
import {useAuthStore} from "@/features/auth/store";
import {BreadCrumb} from "../../index.js";


const authStore = useAuthStore();
const router = useRouter();


async function onUserMenuActions(event){
	switch(event.action){
		case "signOut" :
			try{
				await authStore.signOut();
			}
			catch {
				return;
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
			<BreadCrumb />
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
