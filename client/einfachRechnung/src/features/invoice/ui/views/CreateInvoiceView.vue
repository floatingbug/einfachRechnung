<script setup>
import { reactive, computed, ref, onMounted } from "vue";
import {services} from "../../services";
import useInvoiceStore from "../../store/useInvoiceStore.js";
import {useRouter} from "vue-router";
import {useSettingsStore} from "@/features/settings/store/useSettingsStore.js";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Card from "primevue/card";
import Divider from "primevue/divider";
import { PageHeader } from "@/shared/layouts";
import CustomerSelect from "../components/CustomerSelect.vue";

const form = reactive({
	customer: {
		name: "",
		street: "",
		postalCode: "",
		city: "",
		email: "",
		vatId: ""
	},
	seller: {
		name: "",
		street: "",
		postalCode: "",
		city: "",
		vatId: "",
		taxNumber: ""
	},
	items: [
		{
			name: "",
			description: "",
			quantity: 1,
			unitPrice: 0,
			taxRate: 19
		}
	],
	invoiceDate: "",
	dueDate: "",
	serviceDate: "",
	note: ""
});
const invoiceStore = useInvoiceStore();
const router = useRouter();
const settingsStore = useSettingsStore();
const isSaving = ref(false);
const error = ref("");

onMounted(async () => {
	try {
		await settingsStore.getCompany();
		await settingsStore.getInvoice();
		Object.assign(form.seller, {
			name: settingsStore.company.companyName,
			street: settingsStore.company.street,
			postalCode: settingsStore.company.postalCode,
			city: settingsStore.company.city,
			vatId: settingsStore.company.vatId,
			taxNumber: settingsStore.company.taxNumber,
		});
		const invoiceDate = new Date();
		const dueDate = new Date(invoiceDate);
		dueDate.setDate(dueDate.getDate() + (settingsStore.invoice.defaultPaymentTermsDays || 14));
		form.invoiceDate = invoiceDate.toISOString().slice(0, 10);
		form.dueDate = dueDate.toISOString().slice(0, 10);
	}
	catch {
		error.value = "Standarddaten für die Rechnung konnten nicht geladen werden.";
	}
});

function onCustomerSelect(customer){
	form.customer = { ...customer };
}

function addItem(){
	form.items.push({
		name: "",
		description: "",
		quantity: 1,
		unitPrice: 0,
		taxRate: 19
	});
}

function removeItem(index){
	form.items.splice(index, 1);
}

async function submit(){
	if(isSaving.value) return;
	isSaving.value = true;
	error.value = "";
	try {
		const invoice = await invoiceStore.createInvoice(form);
		await router.push({name: "invoice-details", params: {invoiceId: invoice.id || invoice.invoiceNumber}});
	}
	catch {
		error.value = "Die Rechnung konnte nicht gespeichert werden.";
	}
	finally {
		isSaving.value = false;
	}
}

// --- Calculations ---
const totals = computed(() => {
	return services.calculateInvoiceTotals(form.items);
});
</script>

<template>
	<div class="create-invoice">
		<PageHeader>
			Rechnung erstellen
		</PageHeader>

		<CustomerSelect
			@select="onCustomerSelect"
		/>

		<form class="invoice-form" @submit.prevent="submit">

			<!-- Customer -->
			<fieldset class="customer-section">
				<legend class="customer-header"><h2>Kunde</h2></legend>

				<div class="customer-group">
					<div class="customer-group-item">

						<div class="input">
							<label>Name</label>
							<InputText v-model="form.customer.name" />
						</div>

						<div class="input">
							<label>Straße</label>
							<InputText v-model="form.customer.street" />
						</div>

						<div class="input">
							<label>Postleitzahl</label>
							<InputText v-model="form.customer.postalCode" />
						</div>

					</div>

					<div class="customer-group-item">

						<div class="input">
							<label>Stadt</label>
							<InputText v-model="form.customer.city" />
						</div>

						<div class="input">
							<label>E-Mail</label>
							<InputText v-model="form.customer.email" />
						</div>

						<div class="input">
							<label>USt-IdNr. (optional)</label>
							<InputText v-model="form.customer.vatId" />
						</div>

					</div>
				</div>
			</fieldset>

			<!-- Seller -->
			<fieldset class="seller-section">
				<legend class="seller-header"><h2>Verkäufer</h2></legend>

				<div class="seller-group">
					<div class="seller-group-item">

						<div class="input">
							<label>Firmenname</label>
							<InputText v-model="form.seller.name" />
						</div>

						<div class="input">
							<label>Straße</label>
							<InputText v-model="form.seller.street" />
						</div>

						<div class="input">
							<label>Postleitzahl</label>
							<InputText v-model="form.seller.postalCode" />
						</div>

					</div>

					<div class="seller-group-item">

						<div class="input">
							<label>Stadt</label>
							<InputText v-model="form.seller.city" />
						</div>

						<div class="input">
							<label>USt-IdNr.</label>
							<InputText v-model="form.seller.vatId" />
						</div>

						<div class="input">
							<label>Steuernummer</label>
							<InputText v-model="form.seller.taxNumber" />
						</div>

					</div>
				</div>
			</fieldset>

			<Divider />

			<!-- Items -->
			<fieldset class="items-section">
				<legend><h2>Positionen</h2></legend>

				<div class="items-container">
					<Card
						v-for="(item, index) in form.items"
						:key="index"
					>
						<template #content>
							<div class="item">

								<div class="input">
									<label>Name</label>
									<InputText v-model="item.name" />
								</div>

								<div class="input">
									<label>Beschreibung</label>
									<InputText v-model="item.description" />
								</div>

								<div class="input">
									<label>Menge</label>
									<InputNumber
										v-model="item.quantity"
										@input="(e) => item.quantity = e.value ?? 0"
									/>
								</div>

								<div class="input">
									<label>Einzelpreis</label>
									<InputNumber
										v-model="item.unitPrice"
										mode="currency"
										currency="EUR"
										@input="(e) => item.unitPrice = e.value ?? 0"
									/>
								</div>

								<div class="input">
									<label>Steuer (%)</label>
									<InputNumber
										v-model="item.taxRate"
										:min="0"
										@input="(e) => item.taxRate = e.value ?? 0"
									/>
								</div>

								<Button
									label="Entfernen"
									severity="danger"
									text
									@click="removeItem(index)"
								/>

							</div>
						</template>
					</Card>
				</div>

				<div class="section-btns-container">
					<Button
						label="Position hinzufügen"
						icon="pi pi-plus"
						@click="addItem"
					/>
				</div>
			</fieldset>

			<Divider />

			<!-- Meta -->
			<fieldset>
				<legend>Rechnungsdaten</legend>

				<div class="grid">
					<InputText v-model="form.invoiceNumber" placeholder="Rechnungsnummer" />
					<InputText v-model="form.invoiceDate" placeholder="Rechnungsdatum YYYY-MM-DD" />
					<InputText v-model="form.serviceDate" placeholder="Leistungsdatum YYYY-MM-DD" />
					<InputText v-model="form.dueDate" placeholder="Fälligkeitsdatum YYYY-MM-DD" />
				</div>
			</fieldset>

			<Divider />

			<!-- Totals -->
			<fieldset>
				<legend>Summen</legend>

				<div class="totals">
					<div>Netto: {{totals.netTotal}} €</div>

					<div v-for="(value, rate) in totals.taxBreakdown" :key="rate">
						Steuer ({{ rate }}%): {{ value.toFixed(2) }} €
					</div>

					<div>Steuer gesamt: {{ totals.taxTotal.toFixed(2) }} €</div>

					<div class="gross">Brutto: {{ totals.grossTotal.toFixed(2) }} €</div>
				</div>
			</fieldset>

			<Divider />

			<!-- Note -->
			<fieldset class="note">
				<legend><h2>Notiz</h2></legend>

				<Textarea v-model="form.note" rows="4" />
			</fieldset>

			<section class="actions">
				<div class="section-btns-container">
					<Button label="Abbrechen" severity="secondary" type="button" @click="router.push('/invoice')" />
					<Button label="Rechnung erstellen" type="submit" :loading="isSaving" />
				</div>
				<p v-if="error" class="error">{{ error }}</p>
			</section>

		</form>
	</div>
</template>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.create-invoice {
	width: 100%;
	max-width: 1400px;
	padding: var(--space-lg);

	@include media.up(bp.$bp-lg) {
		padding: 0 var(--space-xl3);
	}
}

.invoice-form {
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
	user-select: none;
}

fieldset {
	border: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

legend {
	margin-bottom: var(--space-md);
}

.input {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.customer-group, .seller-group {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-xl);

	.customer-group-item, .seller-group-item {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
}

.items-container {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-lg);

	.p-card {
		max-width: 300px;
		flex-grow: 1;
	}

	.item {
		display: grid;
		row-gap: var(--space-lg);
	}
}

.section-btns-container {
	display: flex;
	justify-content: flex-end;
	gap: var(--space-lg);
	margin-top: var(--space-xl);
}
</style>
