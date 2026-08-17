<script setup>
import {useRouter} from "vue-router";
import Toolbar from 'primevue/toolbar';
import {UserMenu} from "./components";
import {useAuthStore} from "@/features/auth/store";
import {BreadCrumb} from "../../index.js";


const authStore = useAuthStore();
const router = useRouter();
const props = defineProps({
	sidebarOpen: Boolean,
});
const emit = defineEmits(["sidebar-toggle"]);


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
			<Button
				class="sidebar-toggle"
				:icon="props.sidebarOpen ? 'pi pi-times' : 'pi pi-bars'"
				:text="true"
				rounded
				:aria-label="props.sidebarOpen ? 'Navigation schließen' : 'Navigation öffnen'"
				@click="emit('sidebar-toggle')"
			/>
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
.sidebar-toggle {
	margin-right: var(--space-xs);
}

@media (min-width: 1024px) {
	.sidebar-toggle {
		display: none;
	}
}

.auth-buttons-container {
	display: flex;
	gap: var(--space-md);

	.p-button {
		text-decoration: none;
	}
}
</style>
