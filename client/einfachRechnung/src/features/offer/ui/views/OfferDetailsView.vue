<script setup>
import {ref, onMounted, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useOfferStore} from "../../store";
import {
	OfferDetailsActions,
	OfferDetailsSummary,
} from "../components";
import {
	CustomerCard,
	TotalsList,
	ItemsList
} from "../../../../shared/components";
import { useToast } from 'primevue/usetoast';


const offerStore = useOfferStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();
const offer = ref(null);
const customer = ref(null);


onMounted(async () => {
	await loadOffer();
	customer.value = createCustomerFromOffer(offer);
});


watch(
	() => route.params.offerNumber,
	async () => {
		await loadOffer();
		customer.value = createCustomerFromOffer(offer);
	}
);


// --- handlers ---
function onOfferDetailsAction(event){
	const offerNumber = offer.value.offerNumber;

	switch(event.action){
		case "edit" :
			router.push(`/offer/edit/${offerNumber}`)
		break;

		case "showPdf" :
			showPdf();
		break;

		case "downloadPdf" :
			downloadPdf();
		break;

		case "sendMail" :
		break;

		case "convert" :
		break;

		case "delete" :
			deleteOffer();
		break;
	}
}

async function showPdf() {
	try {
		const pdf = await offerStore.getPdf({
			offerNumber: offer.value.offerNumber,
		});

		const url = URL.createObjectURL(pdf);

		window.open(url, "_blank");
	}
	catch (error) {
		console.error(error);
	}
}

async function downloadPdf() {
	try {
		const pdf = await offerStore.getPdf({
			offerNumber: offer.value.offerNumber,
		});

		const url = URL.createObjectURL(pdf);

		const link = document.createElement("a");
		link.href = url;
		link.download = "angebot.pdf";
		link.click();

		URL.revokeObjectURL(url);
	}
	catch (error) {
		console.error(error);
	}
}

async function deleteOffer(){
	try {
		const result = await offerStore.deleteOffer({
			offerNumber: offer.value.offerNumber,
		})

		if(!result.success){
			return toast.add(
				{
					severity: "error",
					summary: 'Löschen fehlgeschlagen',
					detail: result.message,
					life: 5000
				}
			);
		}

		toast.add(
			{
				summary: 'Angebot gelöscht',
				detail: result.message,
				life: 5000
			}
		);

		router.push("/offer/list");
	}
	catch (error) {
		console.log(error);
	}
}


// --- helpers ---
async function loadOffer() {
	try {
		const offerNumber = route.params.offerNumber;

		offer.value = await offerStore.getOfferByOfferNumber({
			offerNumber,
		});
	}
	catch (error) {
		console.error(error);
	}
}

function createCustomerFromOffer(offer){
	return {
		customerType: offer.value.customerSnapshot.customerType ?? "",
		companyName: offer.value.companyName ?? "",
		customerName: offer.value.customerName ?? "",
		contactPerson: offer.value.contactPerson ?? "",
		street: offer.value.customerSnapshot.street ?? "",
		postalCode: offer.value.customerSnapshot.postalCode ?? "",
		city: offer.value.customerSnapshot.city ?? "",
		email: offer.value.customerSnapshot.email ?? "",
		phone: offer.value.customerSnapshot.phone ?? "",
		vatId: offer.value.customerSnapshot.vatId ?? "",
	};
}

</script>


<template>
	<div class="offer-details document" v-if="offer">
		<section class="top-section">
			<OfferDetailsActions class="offer-details-actions"
				@action="onOfferDetailsAction"
			/>

			<CustomerCard class="customer-card" v-if="customer"
				:customer="customer"
			/>
		</section>

		<Divider />

		<section>
			<h2>Angebotsdaten</h2>

			<OfferDetailsSummary class="offer-summary"
				:offer="offer"
			/>
		</section>

		<Divider />

		<section>
			<div class="introduction">
				<h2>Einleitung</h2>

				<div class="value">
					{{offer.introduction}}
				</div>
			</div>
		</section>

		<Divider />

		<section>
			<h2>Positionen</h2>

			<ItemsList
				:items="offer.items"
				:showTaxRatePerItem="offer.showTaxRatePerItem"
			/>
		</section>

		<Divider />

		<section>
			<h2>Preisübersicht</h2>

			<TotalsList
				:totals="offer.totals"
			/>
		</section>

		<Divider />

		<section>
			<h2>Schlussbemerkung</h2>

			<div class="closing">
				{{offer.closing}}
			</div>
		</section>

		<Divider />

		<section>
			<h2>Historie</h2>

			<div class="grid-2-columns">
				<div class="history">
					<div class="history-item">
						<div class="history-label">
							Erstellt
						</div>

						<div class="history-value">
							{{offer.createdAt.toLocaleDateString()}}
						</div>
					</div>

					<div class="history-item">
						<div class="history-label">
							Geändert
						</div>

						<div class="history-value">
							{{offer.updatedAt.toLocaleDateString()}}
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/media" as media;
@use "@/shared/styles/breakpoints" as bp;

.offer-details {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}

.top-section {
	display: grid;
	gap: var(--space-xl);

	@include media.up(bp.$bp-md){
		grid-template-columns: 1fr 1fr;
	}
}

.customer-card {
	width: 100%;
	max-width: 380px;
}

.offer-details-actions {
	width: 100%;
	max-width: 200px;
	justify-self: start;
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
}

@include media.up(bp.$bp-md){
	.customer-card {
		order: 1;
	}

	.offer-details-actions {
		max-width: 320px;
		justify-self: end;
		order: 2;
	}
}

.grid-2-columns {
	display: grid;
	grid-template-columns: 1fr 1fr;

	.offer-summary {
		grid-column: 1 / 3;
	}

	.history {
		grid-column: 1 / 3;
	}

	@include media.up(bp.$bp-md){
		.offer-summary {
			grid-column: 1 / 2;
		}

		.history {
			grid-column: 1 / 2;
		}
	}
}

.history-item {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.history-label, .history-value {
	flex: 1;
}
</style>
