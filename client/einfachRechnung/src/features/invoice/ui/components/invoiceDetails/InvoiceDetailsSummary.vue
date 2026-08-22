<script setup>
import {computed} from "vue";
import {formatCurrency} from "@/shared/helpers";


const props = defineProps({
	invoice: {
		type: Object,
		required: true,
	},
});


const invoiceDate = computed(() => {
	return formatDate(props.invoice.invoiceDate);
});

const dueDate = computed(() => {
	return formatDate(props.invoice.dueDate);
});


function formatDate(value) {
	if (!value) {
		return "";
	}

	return new Date(value).toLocaleDateString("de-DE");
}


function formatStatus(status) {
	const statuses = {
		draft: "Entwurf",
		open: "Offen",
		cancelled: "Storniert",
		paid: "Bezahlt",
	};

	return statuses[status] ?? status;
}


function formatPaymentStatus(status) {
	const statuses = {
		unpaid: "Unbezahlt",
		partially_paid: "Teilbezahlt",
		paid: "Bezahlt",
	};

	return statuses[status] ?? status;
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
</script>


<template>
	<div class="item-group-1-column">

		<div class="item">
			<div class="item-label">
				Rechnungsnummer
			</div>

			<div class="item-value">
				{{ invoice.invoiceNumber }}
			</div>
		</div>


		<div class="item">
			<div class="item-label">
				Rechnungsdatum
			</div>

			<div class="item-value">
				{{ invoiceDate }}
			</div>
		</div>


		<div class="item">
			<div class="item-label">
				Fälligkeitsdatum
			</div>

			<div class="item-value">
				{{ dueDate }}
			</div>
		</div>


		<div class="item">
			<div class="item-label">
				Status
			</div>

			<div class="item-value">
				{{ formatStatus(invoice.status) }}
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
				Zahlungsart
			</div>

			<div class="item-value">
				{{ formatPaymentMethod(invoice.payment.method) }}
			</div>
		</div>


		<div class="item">
			<div class="item-label">
				Währung
			</div>

			<div class="item-value">
				{{ invoice.currency }}
			</div>
		</div>


		<div class="item">
			<div class="item-label">
				Gesamtbetrag
			</div>

			<div class="item-value">
				{{ formatCurrency(invoice.totals.totalGross) }}
			</div>
		</div>

	</div>
</template>


<style scoped lang="scss">
.item {
	display: flex;
	gap: var(--space-md);
	flex-wrap: wrap;
}

.item-label,
.item-value {
	flex: 1;
	min-width: 0;
}

.item-label {
	color: var(--text-color-muted);
}

.item-value {
	text-align: right;
}
</style>
