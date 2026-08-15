<script setup>
import ItemCard from "./ItemCard.vue";

const props = defineProps({
	items: {
		type: Array,
		default: () => [],
	},
	itemSettings: {
		type: Object,
		default: () => {},
	}
});


const emit = defineEmits([ "action" ]);

</script>


<template>
	<div class="item-card">
		<div class="item-cards-wrapper">
			<ItemCard
				v-for="(item, index) in items"
				:key="index"
				:item="item"
			>
				<template #actions>
					<Button
						label="Löschen"
						severity="danger"
						@click="emit('action',
							{
								action: 'delete',
								id: item.id,
							}
						)"
					/>

					<Button
						label="Bearbeiten"
						severity="secondary"
						@click="emit('action',
							{
								action: 'openItem',
								id: item.id
							}
						)"
					/>
				</template>
			</ItemCard>
		</div>

		<div class="action-buttons">
			<Button
				label="Neue Position"
				@click="emit('action',
					{
						action: 'createItem',
					}
				)"
			/>
		</div>
	</div>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.item-card {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.item-cards-wrapper {
	width: 100%;
	display: grid;
	gap: var(--space-md);
	grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
}

.action-buttons {
	display: flex;
	justify-content: flex-end;
}
</style>
