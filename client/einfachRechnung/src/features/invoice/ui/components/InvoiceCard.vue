<script setup>
import Card from "primevue/card";
import { StatusTag } from "@/shared/components";
import { formatCurrency } from "@/shared/helpers";
import { getInvoiceStatus, getPaymentStatus } from "../items/statusItems.js";

const props = defineProps({
	invoice: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["action"]);

// --- helpers ---
function formatAmount(value) {
	return value == null ? "-" : formatCurrency(value);
}

function openInvoice() {
	emit("action", {
		action: "openInvoice",
		invoiceNumber: props.invoice.invoiceNumber,
	});
}

function onKeydown(event) {
	if(event.key !== "Enter" && event.key !== " ") return;

	event.preventDefault();
	openInvoice();
}
</script>

<template>
	<Card
		class="card card--interactive invoice-card"
		role="button"
		tabindex="0"
		@click="openInvoice"
		@keydown="onKeydown"
	>
		<template #title>
			<div class="invoice-card__title">
				{{ invoice.invoiceNumber }}

				<StatusTag
					:label="getInvoiceStatus(invoice.status).label"
					:severity="getInvoiceStatus(invoice.status).severity"
				/>
			</div>

			<Divider />
		</template>

		<template #content>
			<div class="invoice-card__content">
				<div class="invoice-card__item">
					<span>Kunde</span>

					<div class="invoice-card__item-value">
						{{ invoice.customer }}
					</div>
				</div>

				<div class="invoice-card__item">
					<span>Rechnungsdatum</span>

					<div class="invoice-card__item-value">
						{{ invoice.invoiceDate }}
					</div>
				</div>

				<div class="invoice-card__item">
					<span>Gesamtsumme</span>

					<div class="invoice-card__item-value">
						{{ formatAmount(invoice.grossTotal) }}
					</div>
				</div>

				<div class="invoice-card__item">
					<span>Offener Betrag</span>

					<div class="invoice-card__item-value">
						{{ formatAmount(invoice.openAmount) }}
					</div>
				</div>

				<Divider type="dashed" />

				<div class="invoice-card__item">
					<span>Zahlungsstatus</span>

					<div class="invoice-card__item-value">
						<StatusTag
							:label="getPaymentStatus(invoice.paymentStatus).label"
							:severity="getPaymentStatus(invoice.paymentStatus).severity"
						/>
					</div>
				</div>
			</div>
		</template>
	</Card>
</template>

<style scoped lang="scss">
.invoice-card {
	height: 100%;

	&:focus-visible {
		outline: 2px solid var(--font-color-primary);
		outline-offset: 2px;
	}
}

.invoice-card__title {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--space-md);
}

.invoice-card__content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.invoice-card__item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--space-md);
}

.invoice-card__item-value {
	color: var(--text-color-muted);
	text-align: right;
}
</style>
