<script setup>
import Card from "primevue/card";
import {formatCurrency} from "@/shared/helpers";


const props = defineProps({
	offer: {
		type: Object,
		required: true,
	},
});


const emit = defineEmits(["action"]);


function openOffer(){
	emit("action", {
		action: "openOffer",
		offerNumber: props.offer.offerNumber,
	})
}

</script>

<template>
	<div class="offer-card">
		<Card
			@click="openOffer"
		>
			<template #title>
				{{offer.offerNumber}}

				<Divider />
			</template>


			<template #content>
				<div class="content-items">
					<div class="content-item">
						<div class="item-label">
							Kunde
						</div>

						<div class="content-item__value">
							{{offer.customerName}}
						</div>
					</div>

					<div class="content-item">
						<div class="item-label">
							Angebotsdatum
						</div>

						<div class="content-item__value">
							{{offer.offerDate.toLocaleDateString()}}
						</div>
					</div>

					<div class="content-item">
						<div class="item-label">
							Gültig bis
						</div>

						<div class="content-item__value">
							{{offer.validUntil.toLocaleDateString()}}
						</div>
					</div>

					<div class="content-item">
						<div class="item-label">
							Summer brutto
						</div>

						<div class="content-item__value">
							{{formatCurrency(offer.totals.totalGross)}}
						</div>
					</div>

					<div class="content-item">
						<div class="item-label">
							Status
						</div>

						<div class="content-item__value">
							{{offer.status}}
						</div>
					</div>
				</div>
			</template>
		</Card>
	</div>
</template>

<style scoped lang="scss">
.offer-card {
	width: 100%;
}

.p-card {
	height: 100%;
}

.content-items {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.content-item {
	display: flex;
	justify-content: space-between;
}

.content-item__value {
	color: var(--text-color-muted);
}
</style>
