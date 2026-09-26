<script setup>
import {ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import { CustomerCard, PageContainer } from '@/shared/components';
import {useCustomersStore} from "../../store";
import { DocumentDetailsLayout } from "@/shared/layouts";
import { useOfferStore } from "@/features/offer/store";
import {useInvoiceStore} from "@/features/invoice/store";
import {
	OffersTable,
	InvoicesTable,
	InvoiceCards,
	OfferCards,
	CustomerContact,
	CustomerAddress,
	} from "../components";
import {
	Paginator
} from "primevue";

const customersStore = useCustomersStore();
const offersStore = useOfferStore();
const invoicesStore = useInvoiceStore();
const route = useRoute();
const router = useRouter();
const customer = ref();
const offers = ref([]);
const invoices = ref([]);
const totalInvoicesCount = ref();
const totalOffersCount = ref();


onMounted(async () => {
	customer.value = await customersStore.getCustomerById({
		customerId: route.params.customerId,
	});

	const getOffersResult = await offersStore.getOffers({
		customerId: customer.value.customerId,
	});

	totalOffersCount.value = getOffersResult.pagination.totalPages;
	offers.value = getOffersResult.items;

	const getInvoicesResult = await invoicesStore.getInvoices({
		customerId: customer.value._id,
	});

	totalInvoicesCount.value = getInvoicesResult.pagination.totalPages;
	invoices.value = getInvoicesResult.invoices;
})

</script>


<template>
	<PageContainer v-if="customer">
		<DocumentDetailsLayout>
			<!-- Kunde -->
			<template #customer>
				<CustomerCard
					:customer="customer"
				/>
			</template>

				<!-- Aktionen -->
			<template #actions>
					<Button
						label="Bearbeiten"
						severity="secondary"
						@click="router.push(`/customers/edit/${customer._id}`)"
					/>

					<Button
						label="Löschen"
						severity="danger"
					/>
			</template>

			<template #contentBeforeItems>
				<section>
					<h2>Kontaktdaten</h2>

					<div class="contact-address">
						<CustomerContact class="contact"
							:customer="customer"
						/>

						<CustomerAddress class="address"
							:customer="customer"
						/>
					</div>
				</section>

				<Divider />

				<section>
					<h2>Angebote</h2>

					<OfferCards
						:offers="offers"
						@offerSelected="router.push(`/offer/details/${$event}`)"
					/>

					<OffersTable class="offer-table"
						:offers="offers"
						@offerSelected="router.push(`/offer/details/${$event}`)"
					/>

					<Paginator v-if="offers.length > 10"
						:rows="10"
						:totalRecords="totalOffersCount"
						:rowsPerPageOptions="[10, 20, 50, 100]"
					/>
				</section>

				<Divider />

				<section>
					<h2>Rechnungen</h2>

					<InvoiceCards
						:invoices="invoices"
						@invoiceSelected="router.push(`/invoice/${$event}`)"
					/>

					<InvoicesTable class="invoice-table"
						:invoices="invoices"
						@invoiceSelected="router.push(`/invoice/${$event}`)"
					/>

					<Paginator v-if="invoices.length > 10"
						:rows="10"
						:totalRecords="totalInvoicesCount"
						:rowsPerPageOptions="[10, 20, 50, 100]"
					/>
				</section>
			</template>
		</DocumentDetailsLayout>
	</PageContainer>
</template>


<style lang="scss" scoped>
.contact-address {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: var(--space-xl);

	.contact, .address {
		flex: 1 1 350px;
	}
}

.offer-table {
	display: none;
}

.invoice-table {
	display: none;
}

@media(width >= 713px){
	.invoice-table, .offer-table {
		display: unset;
	}

	.offer-cards, .invoice-cards {
		display: none;
	}
}
</style>
