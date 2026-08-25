<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import { useOfferStore } from "../../store";
import {
	OfferDetailsActions,
	OfferDetailsSummary,
} from "../components";

import {
	CustomerCard,
	TotalsList,
	ItemsList,
	PageContainer,
} from "@/shared/components";

import { DocumentDetailsLayout } from "@/shared/layouts";


const offerStore = useOfferStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const offer = ref(null);


const customer = computed(() => {
	if (!offer.value) {
		return null;
	}

	return createCustomerFromOffer(offer.value);
});


onMounted(async () => {
	await loadOffer();
});


watch(
	() => route.params.offerNumber,
	async () => {
		await loadOffer();
	}
);


// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

async function loadOffer() {
	try {
		const offerNumber = route.params.offerNumber;

		offer.value = await offerStore.getOfferByOfferNumber({
			offerNumber,
		});
	}
	catch {
		offer.value = null;

		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Angebot konnte nicht geladen werden.",
			life: 5000,
		});
	}
}


function createCustomerFromOffer(offer) {
	return {
		customerType: offer.customerSnapshot?.customerType ?? "",
		companyName: offer.companyName ?? "",
		customerName: offer.customerName ?? "",
		contactPerson: offer.contactPerson ?? "",
		street: offer.customerSnapshot?.street ?? "",
		postalCode: offer.customerSnapshot?.postalCode ?? "",
		city: offer.customerSnapshot?.city ?? "",
		email: offer.customerSnapshot?.email ?? "",
		phone: offer.customerSnapshot?.phone ?? "",
		vatId: offer.customerSnapshot?.vatId ?? "",
	};
}


// -----------------------------------------------------------------------------
// Actions
// -----------------------------------------------------------------------------

function onOfferDetailsAction(event) {
	if (!offer.value) {
		return;
	}

	const offerNumber = offer.value.offerNumber;

	switch (event.action) {
		case "edit":
			router.push(`/offer/edit/${offerNumber}`);
			break;

		case "showPdf":
			showPdf();
			break;

		case "downloadPdf":
			downloadPdf();
			break;

		case "sendMail":
			sendOffer();
			break;

		case "convert":
			convertToInvoice();
			break;

		case "delete":
			deleteOffer();
			break;
	}
}


async function sendOffer() {
	try {
		await offerStore.sendOffer({
			offerNumber: offer.value.offerNumber,
		});

		toast.add({
			severity: "success",
			summary: "Angebot versendet",
			life: 5000,
		});

		await loadOffer();
	}
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Angebot konnte nicht versendet werden.",
			life: 5000,
		});
	}
}


async function convertToInvoice() {
	try {
		const result = await offerStore.convertToInvoice({
			offerNumber: offer.value.offerNumber,
		});

		const invoice = result.invoice ?? result;

		toast.add({
			severity: "success",
			summary: "Rechnung erstellt",
			life: 5000,
		});

		await router.push({
			name: "invoice-details",
			params: {
				invoiceNumber: invoice.invoiceNumber,
			},
		});
	}
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Angebot konnte nicht umgewandelt werden.",
			life: 5000,
		});
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
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "PDF konnte nicht geöffnet werden.",
			life: 5000,
		});
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
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "PDF konnte nicht heruntergeladen werden.",
			life: 5000,
		});
	}
}


async function deleteOffer() {
	try {
		const result = await offerStore.deleteOffer({
			offerNumber: offer.value.offerNumber,
		});

		if (!result.success) {
			toast.add({
				severity: "error",
				summary: "Löschen fehlgeschlagen",
				detail: result.message,
				life: 5000,
			});

			return;
		}

		toast.add({
			severity: "success",
			summary: "Angebot gelöscht",
			detail: result.message,
			life: 5000,
		});

		await router.push("/offer/list");
	}
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Angebot konnte nicht gelöscht werden.",
			life: 5000,
		});
	}
}
</script>


<template>
	<PageContainer>
		<DocumentDetailsLayout v-if="offer">

			<template #actions>
				<OfferDetailsActions
					@action="onOfferDetailsAction"
				/>
			</template>


			<template #customer>
				<CustomerCard
					v-if="customer"
					:customer="customer"
				/>
			</template>


			<template #document-data>
				<Divider />

				<h2>Angebotsdaten</h2>

				<OfferDetailsSummary
					:offer="offer"
				/>
			</template>


			<template #contentBeforeItems>
				<h2>Einleitung</h2>

				<div class="value">
					{{ offer.introduction }}
				</div>

				<Divider />
			</template>


			<template #items>
				<h2>Positionen</h2>

				<ItemsList
					:items="offer.items"
					:showTaxRatePerItem="offer.showTaxRatePerItem"
				/>

				<Divider />
			</template>


			<template #totals>
				<h2>Preisübersicht</h2>

				<TotalsList
					:totals="offer.totals"
				/>

				<Divider />
			</template>


			<template #contentAfterTotals>
				<h2>Schlussbemerkung</h2>

				<div class="value">
					{{ offer.closing }}
				</div>

				<Divider />
			</template>


			<template #history>
				<h2>Historie</h2>

				<div class="item-group-1-column">
					<div class="item">
						<div class="item-label">
							Erstellt
						</div>

						<div class="item-value">
							{{ offer.createdAt.toLocaleDateString() }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Geändert
						</div>

						<div class="item-value">
							{{ offer.updatedAt.toLocaleDateString() }}
						</div>
					</div>
				</div>

				<Divider />
			</template>

		</DocumentDetailsLayout>
	</PageContainer>
</template>


<style scoped lang="scss">
</style>
