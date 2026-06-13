<script setup>
import {computed} from "vue";
import {useRouter} from "vue-router";
import getItems from "./getItems";
import PanelMenu from 'primevue/panelmenu';

const router = useRouter();
const items = getItems(
	{
		router,
	}
);

// --- panelStyle ---
const panelStyle = {
	root: {
		style: {
			display: "flex",
			flexDirection: "column",
			marginTop: "var(--space-xl)",
		},
	},
	panel: {
		style: {
			border: "none",
			backgroundColor: "unset",
		},
	},
};

</script>

<template>
	<div class="sidebar">
		<div class="brand">
			<h3>
				Einfach Rechnung
			</h3>
		</div>

		<PanelMenu
			:model="items"
			:pt="panelStyle"
		>
		</PanelMenu>
	</div>
</template>

<style scoped lang="scss">
.brand {
	h3 {
		text-align: center;
	}
}
</style>
