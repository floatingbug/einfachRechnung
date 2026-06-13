<script setup>
import { ref } from 'vue';
import Toolbar from 'primevue/toolbar';
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import SplitButton from "primevue/splitbutton";


const items = ref([
    {
        label: 'Update',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    }
])


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
			<Button icon="pi pi-plus" class="mr-2" severity="secondary" text />
			<Button icon="pi pi-print" class="mr-2" severity="secondary" text />
			<Button icon="pi pi-upload" severity="secondary" text />
		</template>

		<template #center>
		</template>

			<template #end>
			</template>
	</Toolbar>
</template>


<style scoped lang="scss">

</style>
