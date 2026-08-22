<script setup>
</script>


<template>
	<div class="document-details">
		<section>
			<div class="top-section">
				<div class="actions">
					<slot name="actions" />
				</div>

				<div class="customer">
					<slot name="customer" />
				</div>
			</div>
		</section>


		<Divider v-if="$slots.documentData" />

		<section v-if="$slots.documentData">
			<slot name="documentData" />
		</section>


		<Divider v-if="$slots.contentBeforeItems" />

		<section v-if="$slots.contentBeforeItems">
			<slot name="contentBeforeItems" />
		</section>


		<Divider v-if="$slots.items" />

		<section v-if="$slots.items">
			<slot name="items" />
		</section>


		<Divider v-if="$slots.totals" />

		<section v-if="$slots.totals">
			<slot name="totals" />
		</section>


		<Divider v-if="$slots.payment" />

		<section v-if="$slots.payment">
			<slot name="payment" />
		</section>


		<Divider v-if="$slots.contentAfterTotals" />

		<section v-if="$slots.contentAfterTotals">
			<slot name="contentAfterTotals" />
		</section>


		<section v-if="$slots.note">
			<slot name="note" />
		</section>

		<Divider v-if="$slots.bank" />

		<section v-if="$slots.bank">
			<slot name="bank" />
		</section>

		<Divider v-if="$slots.history" />

		<section v-if="$slots.history">
			<slot name="history" />
		</section>
	</div>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/media" as media;
@use "@/shared/styles/breakpoints" as bp;


.document-details {
	width: 100%;
	max-width: 1024px;

	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}


.top-section {
	display: grid;
	gap: var(--space-xl);

	@include media.up(bp.$bp-md) {
		grid-template-columns: 1fr 1fr;
	}
}


.actions {
	width: 100%;
	max-width: 200px;

	justify-self: start;

	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
}


.customer {
	width: 100%;
	max-width: 380px;
}


@include media.up(bp.$bp-md) {
	.customer {
		order: 1;
	}

	.actions {
		max-width: 320px;
		justify-self: end;
		order: 2;
	}
}


.grid-2-columns {
	display: grid;
	grid-template-columns: 1fr 1fr;
}


.history {
	grid-column: 1 / 3;
}


.history-item {
	display: grid;
	grid-template-columns: 1fr 1fr;
}


.history-label,
.history-value {
	flex: 1;
}


@include media.up(bp.$bp-md) {
	.history {
		grid-column: 1 / 2;
	}
}
</style>
