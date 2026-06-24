<script setup>
import {ref} from "vue";
import TieredMenu from 'primevue/tieredmenu';


const emit = defineEmits(["userMenu:action"]);


const menu = ref();

const items = ref([
	{
		label: "Ausloggen",
		icon: "pi pi-sign-out",
		command: () => {
			emit("userMenu:action", {
				action: "signOut",
			});
		},
	},
]);


function toggle(event){
	menu.value.toggle(event);
}

</script>


<template>
	<Button
		icon="pi pi-user"
		type="button"
		@click="toggle"
		aria-haspopup="true"
		aria-controls="overlay_tmenu"
	/>

	<TieredMenu
		ref="menu"
		id="overlay_tmenu"
		:model="items"
		popup
	/>
</template>


<style scoped lang="scss">

</style>
