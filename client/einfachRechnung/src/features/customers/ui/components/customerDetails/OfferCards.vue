<script setup>
import {Card} from "primevue";
import {formatCurrency} from "@/shared/helpers"


defineProps({
	offers: {
		type: Array,
		default: () => [],
	}
});


const emit = defineEmits([ "offerSelected" ]);

</script>


<template>
	<div class="offer-cards">
		<Card class="card card--interactive"
			v-for="(item, index) in offers"
			:key="index"
			@click="emit('offerSelected', item.offerNumber)"
		>
			<template #title>
				{{item.offerNumber}}
			</template>

			<template #subtitle>
				<Divider />
			</template>

			<template #content>
				<div class="item-group-1-column">
					<div class="item">
						<div class="item-label">
							Erstellt
						</div>

						<div class="item-value">
							{{item.offerDate.toLocaleDateString()}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Fällig bis
						</div>

						<div class="item-value">
							{{item.validUntil.toLocaleDateString()}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Betrag
						</div>

						<div class="item-value">
							{{formatCurrency(item.totals.totalGross)}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Status
						</div>

						<div class="item-value">
							{{item.status}}
						</div>
					</div>
				</div>
			</template>
		</Card>
	</div>
</template>


<style lang="scss" scoped>
.offer-cards {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	justify-content: center;
	justify-items: center;
	gap: var(--space-md);
}
</style>
