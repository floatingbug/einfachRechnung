<script setup>
const props = defineProps({
	offer: {
		type: Object,
		required: true,
	}
});

</script>


<template>
	<div class="offer-details-summary">
		<!-- nummer, datum, gültig bis, project -->
		<div class="item-group">
			<div class="item">
				<div class="item-label">
					Angebotsnummer
				</div>

				<div class="item-value">
					{{offer.offerNumber}}
				</div>
			</div>
		</div>

		<div class="item-group">
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

			<div class="item" v-if="offer.project">
				<div class="item-label">
					Projekt
				</div>

				<div class="item-value">
					{{offer.project}}
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.offer-details-summary {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}
</style>
