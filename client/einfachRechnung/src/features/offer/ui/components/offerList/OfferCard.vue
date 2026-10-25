<script setup>
import Card from "primevue/card";
import { StatusTag } from "@/shared/components";
import { formatCurrency } from "@/shared/helpers";
import { getOfferStatus } from "../../items/statusItems.js";


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

function onKeydown(event){
	if(event.key !== "Enter" && event.key !== " ") return;

	event.preventDefault();
	openOffer();
}

</script>

<template>
	<div class="offer-card">
		<Card
			class="card--interactive"
			role="button"
			tabindex="0"
			@click="openOffer"
			@keydown="onKeydown"
		>
			<template #title>
				<div class="offer-card__title">
					{{offer.offerNumber}}

					<StatusTag
						:label="getOfferStatus(offer.status).label"
						:severity="getOfferStatus(offer.status).severity"
					/>
				</div>

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
							{{offer.offerDate?.toLocaleDateString("de-DE")}}
						</div>
					</div>

					<div class="content-item">
						<div class="item-label">
							Gültig bis
						</div>

						<div class="content-item__value">
							{{offer.validUntil?.toLocaleDateString("de-DE")}}
						</div>
					</div>

					<div class="content-item">
						<div class="item-label">
							Summe brutto
						</div>

						<div class="content-item__value">
							{{formatCurrency(offer.totals?.totalGross)}}
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
	height: 100%;
}

.p-card {
	height: 100%;

	&:focus-visible {
		outline: 2px solid var(--font-color-primary);
		outline-offset: 2px;
	}
}

.offer-card__title {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--space-md);
}

.content-items {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.content-item {
	display: flex;
	justify-content: space-between;
	gap: var(--space-md);
}

.content-item__value {
	color: var(--text-color-muted);
	text-align: right;
}
</style>
