<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import { LineItems, PageContainer, SelectCustomer } from '@/shared/components';
import {useSettingsStore} from "@/features/settings/store/useSettingsStore.js";
import { DatePicker, Select, useToast } from "primevue";
import {createInvoiceEntity} from "@/features/invoice/entities";
import {paymentMethodOptions} from "@/shared/options";
import {useInvoiceStore} from "../../store";
import { taxTreatmentOptions } from "../options";


const invoiceStore = useInvoiceStore();
const toast = useToast();
const settingsStore = useSettingsStore();
const router = useRouter();
const invoice = ref();
const itemSettings = ref();
const selectedCustomer = ref();


onMounted(async () => {
	const invoiceSettings = await settingsStore.getInvoice();
	const taxSettings = await settingsStore.getTax();

	// itemSettings for LineItems.vue
	itemSettings.value = {
		taxRate: taxSettings.defaultVatRate,
	};

	invoice.value = createInvoiceEntity({
		invoiceSettings,
		taxSettings,
	});

	console.log(invoice.value);
});

async function createInvoice(){
	try {
		const invoiceNumber = await invoiceStore.createInvoice({
			invoice: invoice.value,
			customerId: selectedCustomer.value.id,
		});

		router.push(`/invoice/${invoiceNumber}`)

		toast.add({
			severity: "success",
			summary: "Gespeichert",
			detail: "Die Rechnung wurde gespeichert.",
			life: 5000,
		});
	}
	catch {
		toast.add({
			severity: "error",
			summary: "Fehler",
			detail: "Die Rechnung konnten nicht gespeichert werden.",
			life: 5000
		});
	}
}

</script>


<template>
	<PageContainer>
		<template #header>
			Schnelle Rechnung
		</template>

		<form>
			<section>
				<h2>Kunde Auswählen</h2>

				<div class="item-group">
					<div class="item">
						<SelectCustomer
							@customerSelected="selectedCustomer = $event;"
						/>
					</div>

					<div class="item">
						<Button
							label="Kunde anlegen"
							severity="secondary"
							@click="router.push('/customer/create')"
						/>
					</div>
				</div>
			</section>
		</form>

		<form v-if="invoice && selectedCustomer">
			<Divider />

			<section>
				<h2>Kunde</h2>

				<div class="item-group-1-column company" v-if="selectedCustomer?.customerType === 'company'">
					<div class="item">
						<div class="item-label">
							Firma
						</div>

						<div class="item-value">
							{{selectedCustomer.companyName}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Ansprechpartner
						</div>

						<div class="item-value">
							{{selectedCustomer.contactPerson}}
						</div>
					</div>
				</div>

				<div class="item-group-1-column company" v-if="selectedCustomer?.customerType === 'private'">
					<div class="item">
						<div class="item-label">
							Name
						</div>

						<div class="item-value">
							{{selectedCustomer.name}}
						</div>
					</div>
				</div>

				<div class="item-group-1-column">
					<div class="item">
						<div class="item-label">
							Straße
						</div>

						<div class="item-value">
							{{selectedCustomer.street}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Postleitzahl
						</div>

						<div class="item-value">
							{{selectedCustomer.postalCode}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Wohnort
						</div>

						<div class="item-value">
							{{selectedCustomer.city}}
						</div>
					</div>
				</div>
			</section>

			<Divider />
				<h2>Rechnungsdaten</h2>

				<div class="input-group">
					<div class="input">
						<label for="invoiceDate">Rechnungs Datum</label>

						<DatePicker
							v-model="invoice.invoiceDate"
						/>
					</div>

					<div class="input">
						<label for="dueDate">Fällig bis</label>

						<DatePicker
							v-model="invoice.dueDate"
						/>
					</div>

					<div class="input">
						<label for="serviceDate">Leistungs Datum</label>

						<DatePicker
							v-model="invoice.serviceDate"
						/>
					</div>

					<div class="input" v-if="invoice.reverseChargeEnabled">
						<label for="taxTreatment">Steuerliche Behandlung</label>

						<Select
							v-model="invoice.taxTreatment"
							:options="taxTreatmentOptions"
							optionLabel="label"
							optionValue="value"
						/>
					</div>
				</div>
			<Divider />

			<section>
				<h2>Positionen</h2>

				<LineItems
					v-model="invoice.items"
					:itemSettings="itemSettings"
				/>
			</section>

			<Divider />

			<section>
				<h2>Zahlungs Methode</h2>

				<Select
					v-model="invoice.paymentMethod"
					:options="paymentMethodOptions"
					optionLabel="label"
					optionValue="value"
					placeholder="Zahlungsart auswählen"
				/>
			</section>

			<div class="form-actions">
				<Button
					label="Rechnung Speichern"
					@click="createInvoice"
				/>
			</div>
		</form>
	</PageContainer>
</template>


<style lang="scss" scoped>
.form-actions {
	display: flex;
	justify-content: flex-end;
	margin-top: var(--space-xl);
}
</style>
