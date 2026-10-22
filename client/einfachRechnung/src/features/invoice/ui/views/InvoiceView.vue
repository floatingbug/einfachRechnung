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
	AddPaymentDialog,
	InvoiceDetailsActions,
	InvoiceDetailsSummary,
} from "../components";
import {
	formatCurrency,
	formatPaymentMethod,
	formatPaymentStatus,
} from "@/shared/helpers";


const invoiceStore = useInvoiceStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const invoice = ref(null);
const customer = ref(null);
const isLoading = ref(false);
const isPaymentDialogVisible = ref(false);


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

		case "addPayment":
			isPaymentDialogVisible.value = true;
			break;

		case "showPdf":
			showPdf();
			break;

		case "downloadPdf":
			downloadPdf();
			break;

		case "sendMail":
			sendInvoiceByEmail();
			break;

		case "cancel":
			cancelInvoice();
			break;

		case "delete":
			deleteInvoice();
			break;
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
	catch (error){
		console.log(error.response.data.message)

		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: error.response.data.message,
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

async function sendInvoiceByEmail(){
	try {
		isLoading.value = true;

		await invoiceStore.sendInvoiceByEmail({
			invoiceNumber: invoice.value.invoiceNumber,
		});

		await loadInvoice();

		toast.add({
			severity: "success",
			summary: "Rechnung wurde versendet.",
			life: 5000,
		});
	}
	catch (error) {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: error.response.data.error,
			life: 5000,
		});
	}
	finally{
		isLoading.value = false;
	}
}

async function savePayment(payment){
	try {
		isLoading.value = true;

		await invoiceStore.registerPayment({
			invoiceId: invoice.value.id,
			payment,
		});

		await loadInvoice();

		isPaymentDialogVisible.value = false;

		toast.add({
			severity: "success",
			summary: "Zahlung erfasst",
			life: 5000,
		});
	}
	catch (error) {
		const detail = error.response?.data?.error?.message ??
			error.response?.data?.error ??
			"Zahlung konnte nicht gespeichert werden.";

		toast.add({
			severity: "error",
			summary: "Fehler",
			detail,
			life: 5000,
		});
	}
	finally {
		isLoading.value = false;
	}
}

async function deleteInvoice(){
	try {
		await invoiceStore.deleteInvoice();
		router.push("/invoice");

		toast.add({
			severity: "info",
			summary: "Gelöscht",
			detail: "Rechnung wurde gelöscht.",
			life: 5000,
		});
	}
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Rechnung konnte nicht gelöscht werden.",
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

function formatInvoiceStatus(status) {
	const statuses = {
		draft: "Entwurf",
		sent: "Versendet",
		open: "Offen",
		cancelled: "Storniert",
		paid: "Bezahlt",
	};

	return statuses[status] ?? status;
}


function formatDate(value) {
	if (!value) {
		return "";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return date.toLocaleDateString("de-DE");
}
</script>


<template>
	<PageContainer
		:isLoading="isLoading"
	>
		<DocumentDetailsLayout v-if="invoice">

			<!-- Aktionen -->
			<template #actions>
				<InvoiceDetailsActions
					:status="invoice.status"
					:paymentStatus="invoice.payment.status"
					:openAmount="invoice.payment.openAmount"
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
						class="payment-list-item"
					>
						<div class="item">
							<div class="item-label">
								{{ formatDate(payment.paidAt) }}
							</div>

							<div class="item-value">
								{{ formatCurrency(payment.amount) }}
							</div>
						</div>

						<div
							v-if="payment.method || payment.reference"
							class="payment-meta"
						>
							<span v-if="payment.method">
								{{ formatPaymentMethod(payment.method) }}
							</span>

							<span v-if="payment.reference">
								{{ payment.reference }}
							</span>
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

		<AddPaymentDialog
			v-if="invoice"
			:visible="isPaymentDialogVisible"
			:invoice="invoice"
			@close="isPaymentDialogVisible = false"
			@submit="savePayment"
		/>
	</PageContainer>
</template>


<style scoped lang="scss">
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

.payment-list-item {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.payment-meta {
	display: flex;
	gap: var(--space-md);
	color: var(--text-color-muted);
	font-size: var(--font-size-sm);
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
