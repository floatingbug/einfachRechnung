<script setup>
import {
	ItemsCards,
	ItemsTable,
} from "./components";


defineProps({
	items: {
		type: Array,
		default: () => [],
	},
});

</script>


<template>
	<div>
		<ItemsTable class="items-table"
			:items="items"
		/>

		<ItemsCards class="items-cards"
			:items="items"
		/>
	</div>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.items-table {
	display: none;
}


@include media.up(bp.$bp_md) {
	.items-cards {
		display: none;
	}

	.items-table {
		display: block;
	}
}
</style>
