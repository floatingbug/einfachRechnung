<script setup>
import {ref} from "vue";
import TieredMenu from 'primevue/tieredmenu';


const props = defineProps({
	possibleActions: {
		type: Array,
		default: () => [],
	},
})


const emit = defineEmits(["action"]);


const menu = ref(null);

const actionMap = {
    edit: {
        label: "Bearbeiten",
		severity: "secondary",
    },

    send: {
        label: "Per E-Mail senden",
		severity: "secondary",
    },

    delete: {
        label: "Löschen",
		severity: "danger",
    },

    viewPdf: {
        label: "PDF anzeigen",
		severity: "secondary",
    },

    downloadPdf: {
        label: "PDF herunterladen",
		severity: "secondary",
    },

    convertToInvoice: {
        label: "In Rechnung umwandeln",
		severity: "contrast",
    },
};

const items = props.possibleActions.map(action => ({
    label: actionMap[action].label,
	severity: actionMap[action].severity,
    command: () => emit("action", {action}),
}));


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
				v-for="(item, index) of items"
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

@include media.up(bp.$bp-md){
	.action-buttons-desktop {
		display: flex;
	}

	.action-buttons-mobile {
		display: none;
	}
}
</style>
