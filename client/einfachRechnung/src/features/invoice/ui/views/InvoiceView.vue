<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useToast} from "primevue/usetoast";
import useInvoiceStore from "../../store/useInvoiceStore.js";
import {
	CustomerCard,
	ItemsList,
	PageContainer,
	TotalsList,
} from "@/shared/components";
import {DocumentDetailsLayout} from "@/shared/layouts";
import {
	InvoiceDetailsActions,
	InvoiceDetailsSummary,
} from "../components";
import {formatCurrency} from "@/shared/helpers";


const invoiceStore = useInvoiceStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const invoice = ref(null);
const customer = ref(null);


// --- lifecycle ---

onMounted(async () => {
	await loadInvoice();
});

watch(
	() => route.params.invoiceNumber,
	async () => {
		await loadInvoice();
	}
);


// --- actions ---

function onInvoiceDetailsAction(event) {
	const invoiceNumber = invoice.value.invoiceNumber;

	switch (event.action) {
		case "edit":
			router.push(`/invoice/edit/${invoiceNumber}`);
			break;

		case "showPdf":
			showPdf();
			break;

		case "downloadPdf":
			downloadPdf();
			break;

		case "sendMail":
			sendInvoice();
			break;

		case "cancel":
			cancelInvoice();
			break;
	}
}


async function sendInvoice() {
	try {
		await invoiceStore.sendInvoice({
			invoiceNumber: invoice.value.invoiceNumber,
		});

		toast.add({
			severity: "success",
			summary: "Rechnung versendet",
			life: 5000,
		});

		await loadInvoice();
	}
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Rechnung konnte nicht versendet werden.",
			life: 5000,
		});
	}
}


async function cancelInvoice() {
	try {
		await invoiceStore.cancelInvoice({
			invoiceNumber: invoice.value.invoiceNumber,
		});

		toast.add({
			severity: "success",
			summary: "Rechnung storniert",
			life: 5000,
		});

		await loadInvoice();
	}
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Rechnung konnte nicht storniert werden.",
			life: 5000,
		});
	}
}


async function showPdf() {
	try {
		const pdf = await invoiceStore.getPdf({
			invoiceNumber: invoice.value.invoiceNumber,
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
		const pdf = await invoiceStore.getPdf({
			invoiceNumber: invoice.value.invoiceNumber,
		});

		const url = URL.createObjectURL(pdf);

		const link = document.createElement("a");
		link.href = url;
		link.download = `${invoice.value.invoiceNumber}.pdf`;
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


// --- data ---

async function loadInvoice() {
	try {
		const invoiceNumber = route.params.invoiceNumber;

		invoice.value = await invoiceStore.getInvoiceByInvoiceNumber({
			invoiceNumber,
		});
	}
	catch {
		invoice.value = null;
		customer.value = null;

		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Rechnung konnte nicht geladen werden.",
			life: 5000,
		});
	}
}

function formatPaymentMethod(method) {
	const methods = {
		bank_transfer: "Überweisung",
		cash: "Barzahlung",
		card: "Kartenzahlung",
		direct_debit: "Lastschrift",
	};

	return methods[method] ?? method;
}


function formatPaymentStatus(status) {
	const statuses = {
		unpaid: "Unbezahlt",
		partially_paid: "Teilbezahlt",
		paid: "Bezahlt",
	};

	return statuses[status] ?? status;
}


function formatInvoiceStatus(status) {
	const statuses = {
		draft: "Entwurf",
		open: "Offen",
		cancelled: "Storniert",
		paid: "Bezahlt",
	};

	return statuses[status] ?? status;
}
</script>


<template>
	<PageContainer>
		<DocumentDetailsLayout v-if="invoice">

			<!-- Aktionen -->
			<template #actions>
				<InvoiceDetailsActions
					class="invoice-details-actions"
					@action="onInvoiceDetailsAction"
				/>
			</template>


			<!-- Kunde -->
			<template #customer>
				<CustomerCard
					v-if="invoice.customer"
					class="customer-card"
					:customer="invoice.customer"
				/>
			</template>


			<!-- Rechnungsdaten -->
			<template #documentData>

				<h2>Rechnungsdaten</h2>

				<InvoiceDetailsSummary
					class="invoice-summary"
					:invoice="invoice"
				/>

				<Divider />
			</template>


			<!-- Positionen -->
			<template #items>
				<h2>Positionen</h2>

				<ItemsList
					:items="invoice.items"
					:showTaxRatePerItem="true"
				/>

				<Divider />
			</template>


			<!-- Preisübersicht -->
			<template #totals>
				<h2>Preisübersicht</h2>

				<TotalsList
					:totals="invoice.totals"
				/>

				<Divider />
			</template>


			<!-- Zahlung -->
			<template #payment>
				<h2>Zahlung</h2>

				<div class="item-group-1-column">

					<div class="item">
						<div class="item-label">
							Zahlungsart
						</div>

						<div class="item-value">
							{{ formatPaymentMethod(invoice.payment.method) }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Zahlungsstatus
						</div>

						<div class="item-value">
							{{ formatPaymentStatus(invoice.payment.status) }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Rechnungsbetrag
						</div>

						<div class="item-value">
							{{ formatCurrency(invoice.totals.totalGross) }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Bezahlt
						</div>

						<div class="item-value">
							{{ formatCurrency(invoice.payment.paidAmount) }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Offener Betrag
						</div>

						<div class="item-value">
							{{ formatCurrency(invoice.payment.openAmount) }}
						</div>
					</div>

				</div>

				<div
					v-if="invoice.payment.payments?.length"
					class="payments"
				>
					<h3>Zahlungen</h3>

					<div
						v-for="(payment, index) in invoice.payment.payments"
						:key="payment.id ?? index"
						class="item"
					>
						<div class="item-label">
							{{ payment.date }}
						</div>

						<div class="item-value">
							{{ formatCurrency(payment.amount) }}
						</div>
					</div>
				</div>

				<Divider />
			</template>


			<!-- Hinweis -->
			<template #note v-if="invoice.note">
				<h2>Hinweis</h2>

				<div class="value">
					{{ invoice.note }}
				</div>

				<Divider />
			</template>

			<!-- Bankverbindung -->
			<template #bank>
				<h2>Bankverbindung</h2>

				<div class="item-group-1-column">
					<div class="item">
						<div class="item-label">
							Bank
						</div>

						<div class="item-value">
							{{ invoice.seller.bank?.bankName ?? "" }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							IBAN
						</div>

						<div class="item-value">
							{{ invoice.seller.bank?.iban ?? "" }}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							BIC
						</div>

						<div class="item-value">
							{{ invoice.seller.bank?.bic ?? "" }}
						</div>
					</div>
				</div>

				<Divider />
			</template>

			<!-- Historie -->
			<template #history>
				<div class="history">

					<h2>Historie</h2>

					<div class="history-item">
						<div class="history-label">
							Status
						</div>

						<div class="history-value">
							{{ formatInvoiceStatus(invoice.status) }}
						</div>
					</div>

					<div class="history-item">
						<div class="history-label">
							Rechnungsdatum
						</div>

						<div class="history-value">
							{{ new Date(invoice.invoiceDate).toLocaleDateString() }}
						</div>
					</div>

					<div class="history-item">
						<div class="history-label">
							Fälligkeitsdatum
						</div>

						<div class="history-value">
							{{ new Date(invoice.dueDate).toLocaleDateString() }}
						</div>
					</div>
				</div>
			</template>
		</DocumentDetailsLayout>
	</PageContainer>
</template>


<style scoped lang="scss">
.invoice-details-actions {
	width: 100%;
	max-width: 200px;

	justify-self: start;

	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
}

.customer-card {
	width: 100%;
	max-width: 380px;
}

.invoice-summary {
	width: 100%;
	max-width: 600px;
}

.payments {
	margin-top: var(--space-xl);

	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.history {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.history-item {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.history-label {
	color: var(--text-color-muted);
}

.history-value {
	min-width: 0;
}
</style>
