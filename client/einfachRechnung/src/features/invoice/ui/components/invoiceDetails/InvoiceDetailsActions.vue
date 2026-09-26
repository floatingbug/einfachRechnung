<script setup>
import {ref, onMounted} from "vue";
import TieredMenu from "primevue/tieredmenu";


const props = defineProps({
	status: {
		type: String,
		required: true,
	}
});


const emit = defineEmits(["action"]);


const menu = ref(null);

const itemsMap = {
	showPdf: {
		label: "PDF anzeigen",
		severity: "secondary",
		command: () => emit("action", {action: "showPdf"}),
	},
	downloadPdf: {
		label: "PDF herunterladen",
		severity: "secondary",
		command: () => emit("action", {action: "downloadPdf"}),
	},
	sendEmail: {
		label: "Per E-Mail senden",
		severity: "secondary",
		command: () => emit("action", {action: "sendMail"}),
	},
	cancel: {
		label: "Stornieren",
		severity: "danger",
		command: () => emit("action", {action: "cancel"}),
	},
};

const items = ref([]);
const isEditable = ref();


onMounted(() => {
	isEditable.value = props.status !== "sent" && props.status !== "cancelled";

	switch(props.status){
		case "cancelled":
			items.value = [
				itemsMap.showPdf,
				itemsMap.downloadPdf,
			];
		break;

		default:
			items.value = Object.values(itemsMap);
	}
})


function toggle(event) {
	menu.value.toggle(event);
}
</script>


<template>
	<div class="actions">

		<div class="action-buttons-mobile">
			<Button v-if="isEditable"
				label="Bearbeiten"
				severity="secondary"
				@click="emit('action', {action: 'edit'})"
			/>

			<Button v-if="items.length > 0 && isEditable"
				label="Weitere Aktionen"
				@click="toggle"
			/>

			<Button v-else
				v-for="(item, index) in items"
				:key="index"
				:label="item.label"
				:severity="item.severity"
				@click="item.command"
			/>

			<TieredMenu
				:model="items"
				ref="menu"
				popup
			/>

		</div>


		<div class="action-buttons-desktop">
			<Button v-if="isEditable"
				label="Bearbeiten"
				severity="secondary"
				@click="emit('action', {action: 'edit'})"
			/>

			<Button
				v-for="(item, index) in items"
				:key="index"
				:label="item.label"
				:severity="item.severity"
				@click="item.command"
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


@include media.up(bp.$bp-md) {
	.action-buttons-desktop {
		display: flex;
	}

	.action-buttons-mobile {
		display: none;
	}
}
</style>
