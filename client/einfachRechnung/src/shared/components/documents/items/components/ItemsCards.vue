<script setup>
import {ItemCard} from "@/shared/components";


defineProps({
	items: {
		type: Array,
		default: () => [],
	},
});

</script>


<template>
	<div class="items-cards">
		<ItemCard class="item"
			v-for="(item, index) in items"
			:key="index"
			:item="item"
		/>
	</div>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/media" as media;
@use "@/shared/styles/breakpoints" as bp;

.items-cards {
	display: grid;
	gap: var(--space-xl);
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
