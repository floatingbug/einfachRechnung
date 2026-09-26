<script setup>
import {ref} from "vue";
import {Badge, Card} from "primevue";


const props = defineProps({
	customer: {
		type: Object,
		required: true,
	},
});


const customerType = ref(
	props.customer.customerType === "company" ?
		"Firma" :
		"Privat"
)

const salutations = {
	male: "Herr",
	female: "Frau",
	diverse: "Divers",
};
</script>

<template>
	<Card class="card">
		<template #title>
			<div class="customer-card__title">
				Kunde
				<Badge
					:value="customerType"
					severity="secondary"
				/>
			</div>

			<Divider />
		</template>


		<template #content>
			<div class="content-container">
				<div class="customer-company" v-if="customer.customerType === 'company'">
					<div class="item-group-1-column">
						<div class="item">
							<div class="item-label">
								Firma
							</div>

							<div class="item-value">
								{{ customer.companyName}}
							</div>
						</div>

						<div class="item">
							<div class="item-label">
								Ansprechpartner
							</div>

							<div class="item-value">
								{{ customer.contactPerson }}
							</div>
						</div>
					</div>
				</div>

				<div class="customer-private" v-else >
					<div class="item-group-1-column">
						<div class="item">
							<div class="item-label">
								Name
							</div>

							<div class="item-value">
								{{ salutations[customer.salutation] }}
								{{ customer.firstName}}
								{{ customer.lastName}}
							</div>
						</div>
					</div>
				</div>

				<div class="item-group-1-column">
					<div class="item">
						<div class="item-label">
							Straße
						</div>

						<div class="item-value">
							{{ customer.street }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Postleitzahl Wohnort
						</div>

						<div class="item-value">
							{{ customer.postalCode }}
							{{ customer.city }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							E-Mail
						</div>

						<div class="item-value">
							{{ customer.email }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Telefon
						</div>

						<div class="item-value">
							{{ customer.phone }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							StIdNr.
						</div>

						<div class="item-value">
							{{ customer.vatId }}
						</div>
					</div>
				</div>
			</div>
		</template>
	</Card>
</template>

<style scoped lang="scss">
.customer-card {
	height: 100%;
}

.content-container {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}
</style>
