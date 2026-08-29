<script setup>
import {ref} from "vue";
import TieredMenu from 'primevue/tieredmenu';


defineProps({
	isDeleteable: {
		type: Boolean,
		default: false,
	},
})


const emit = defineEmits(["action"]);


const menu = ref(null);
const items = [
	{
		label: "PDF anzeigen",
		command: () => emit("action", {action: "showPdf"}),
	},
	{
		label: "PDF herunterladen",
		command: () => emit("action", {action: "downloadPdf"}),
	},
	{
		label: "Per E-Mail senden",
		command: () => emit("action", {action: "sendMail"}),
	},
	{
		label: "In Rechnung umwandeln",
		command: () => emit("action", {action: "convert"}),
	},
	{
		label: "Löschen",
		command: () => emit("action", {action: "delete"}),
	},
];


function toggle(event){
    menu.value.toggle(event);
}

</script>

<template>
	<div class="actions">
		<div class="action-buttons-mobile">
			<Button
				label="Bearbeiten"
				severity="secondary"
				@click="emit('action', {action: 'edit'})"
			/>

			<Button
				label="Weitere Aktionen"
				@click="toggle"
			/>

			<TieredMenu
				:model="items"
				ref="menu"
				popup
			/>
		</div>

		<div class="action-buttons-desktop">
			<Button
				label="Bearbeiten"
				severity="secondary"
				@click="emit('action', {action: 'edit'})"
			/>

			<Button
				label="PDF anzeigen"
				severity="secondary"
				@click="emit('action', {action: 'showPdf'})"
			/>

			<Button
				label="PDF herunterladen"
				severity="secondary"
				@click="emit('action', {action: 'downloadPdf'})"
			/>

			<Button
				label="Per E-Mail senden"
				severity="secondary"
				@click="emit('action', {action: 'sendMail'})"
			/>

			<Button
				label="In Rechnung umwandeln"
				severity="contrast"
				@click="emit('action', {action: 'convert'})"
			/>

			<Button v-if="isDeleteable"
				label="Löschen"
				severity="danger"
				@click="emit('action', {action: 'delete'})"
			/>
		</div>
	</div>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/media" as media;
@use "@/shared/styles/breakpoints" as bp;

.action-buttons-mobile {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.action-buttons-desktop {
	display: none;
	flex-direction: column;
	gap: var(--space-md);
}

@include media.up(bp.$bp-md){
	.action-buttons-desktop {
		display: flex;
	}

	.action-buttons-mobile {
		display: none;
	}
}
</style>
