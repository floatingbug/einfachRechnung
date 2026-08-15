<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useToast} from "primevue/usetoast";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import {canSendReminder} from "../../domainRules/dunning.rules.js";
import useInvoiceStore from "../../store/useInvoiceStore.js";

const invoiceStore = useInvoiceStore();
const route = useRoute();
const invoice = ref(null);
const error = ref("");
const toast = useToast();
const payment = ref({amount: null, paidAt: new Date()});

onMounted(async () => {
	try {
		invoice.value = await invoiceStore.getInvoiceById({invoiceId: route.params.invoiceId});
	}
	catch {
		error.value = "Die Rechnung konnte nicht geladen werden.";
	}
});

const invoiceId = () => invoice.value.id || route.params.invoiceId;

async function run(action, successMessage){
	try {
		invoice.value = await action();
		toast.add({severity: "success", summary: successMessage, life: 5000});
	}
	catch (actionError) {
		toast.add({severity: "error", summary: "Fehler", detail: actionError.message || "Aktion konnte nicht ausgeführt werden.", life: 5000});
	}
}

function send(){ return run(() => invoiceStore.sendInvoice({invoiceId: invoiceId()}), "Rechnung versendet"); }
function cancel(){ return run(() => invoiceStore.cancelInvoice({invoiceId: invoiceId()}), "Rechnung storniert"); }
function remind(){ return run(() => invoiceStore.sendReminder({invoiceId: invoiceId()}), "Mahnung versendet"); }
async function savePayment(){
	await run(() => invoiceStore.registerPayment({invoiceId: invoiceId(), payment: payment.value, openAmount: invoice.value.openAmount}), "Zahlung erfasst");
	payment.value = {amount: null, paidAt: new Date()};
}
async function downloadPdf(){
	try {
		const pdf = await invoiceStore.getInvoicePdf({invoiceId: invoiceId()});
		const url = URL.createObjectURL(pdf);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${invoice.value.invoiceNumber}.pdf`;
		link.click();
		URL.revokeObjectURL(url);
	}
	catch {
		toast.add({severity: "error", summary: "Fehler", detail: "PDF konnte nicht heruntergeladen werden.", life: 5000});
	}
}
</script>


<template>
	<section v-if="invoice">
		<h1>Rechnung {{ invoice.invoiceNumber }}</h1>
		<p><strong>Kunde:</strong> {{ invoice.customer?.name }}</p>
		<p><strong>Bruttosumme:</strong> {{ invoice.grossTotal }} {{ invoice.currency }}</p>
		<p><strong>Offener Betrag:</strong> {{ invoice.openAmount }} {{ invoice.currency }}</p>
		<div class="actions">
			<Button v-if="invoice.status === 'draft'" label="Rechnung senden" @click="send" />
			<Button label="PDF herunterladen" severity="secondary" @click="downloadPdf" />
			<Button v-if="invoice.status !== 'cancelled' && invoice.paymentStatus !== 'paid'" label="Stornieren" severity="danger" @click="cancel" />
			<Button v-if="canSendReminder(invoice)" label="Mahnung senden" severity="warn" @click="remind" />
		</div>
		<form v-if="invoice.status !== 'cancelled' && invoice.openAmount > 0" class="payment" @submit.prevent="savePayment">
			<h2>Zahlung erfassen</h2>
			<InputNumber v-model="payment.amount" mode="currency" :currency="invoice.currency || 'EUR'" :min="0.01" />
			<DatePicker v-model="payment.paidAt" dateFormat="yy-mm-dd" />
			<Button label="Zahlung speichern" type="submit" />
		</form>
	</section>
	<p v-else-if="error">{{ error }}</p>
	<p v-else>Lade Rechnung …</p>
</template>


<style scoped lang="scss">
.actions, .payment { display: flex; flex-wrap: wrap; gap: var(--space-md); margin-top: var(--space-xl); }
.payment { flex-direction: column; max-width: 28rem; }
</style>
