<script setup>
import Card from "primevue/card";

defineProps({
	customer: {
		type: Object,
		required: true,
	},
});

const salutations = {
	male: "Herr",
	female: "Frau",
	diverse: "Divers",
};
</script>

<template>
	<Card class="customer-card">
		<template #title>
			Kunde
		</template>

		<template #content>
			<div class="customer-card__content">
				<template v-if="customer.customerType === 'company'">
					<div class="customer-card__name">
						{{ customer.customerName}}
					</div>

					<div
						v-if="customer.contactPerson"
						class="customer-card__contact"
					>
						<span>Ansprechpartner: </span>
						{{ customer.contactPerson }}
					</div>
				</template>

				<template v-else>
					<div class="customer-card__name">
						{{ salutations[customer.salutation] }}
						{{ customer.customerName}}
					</div>
				</template>

				<div class="customer-card__address">
					<div>{{ customer.street }}</div>
					<div>
						{{ customer.postalCode }}
						{{ customer.city }}
					</div>
				</div>

				<div class="customer-card__contact-data">
					<div v-if="customer.email">
						{{ customer.email }}
					</div>

					<div v-if="customer.phone">
						{{ customer.phone }}
					</div>
				</div>

				<div
					v-if="customer.customerType === 'company' && customer.vatId"
					class="customer-card__vat"
				>
					USt-IdNr.: {{ customer.vatId }}
				</div>
			</div>
		</template>
	</Card>
</template>

<style scoped lang="scss">
.customer-card {
	height: 100%;
}

.customer-card__content {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.customer-card__name {
	font-size: 1.1rem;
	font-weight: 600;
}

.customer-card__contact {
	color: var(--text-color-secondary);
}

.customer-card__address,
.customer-card__contact-data {
	display: flex;
	flex-direction: column;
	gap: .25rem;
}

.customer-card__vat {
	color: var(--text-color-secondary);
	font-size: .9rem;
}
</style>
