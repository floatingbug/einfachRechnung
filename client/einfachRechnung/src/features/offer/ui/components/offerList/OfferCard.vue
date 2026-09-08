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
				<div class="item-group-1-column">
					<div class="item">
						<div class="item-label">
							Kunde
						</div>

						<div class="item-value">
							{{offer.customerName}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Angebotsdatum
						</div>

						<div class="item-value">
							{{offer.offerDate.toLocaleDateString()}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Gültig bis
						</div>

						<div class="item-value">
							{{offer.validUntil.toLocaleDateString()}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Summer brutto
						</div>

						<div class="item-value">
							{{formatCurrency(offer.totals.totalGross)}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Status
						</div>

						<div class="item-value">
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

.item {
	justify-content: space-between;
}
</style>
