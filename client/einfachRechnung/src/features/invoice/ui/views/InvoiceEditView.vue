<script setup>
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import { useInvoiceStore } from "../../store";
import {DatePicker, Textarea} from "primevue";
import {PageContainer, LineItems, SelectCurrency, SelectPaymentMethod} from "@/shared/components";
import { useToast } from 'primevue/usetoast';


const invoiceStore = useInvoiceStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();


onMounted(async () => {
	const invoiceNumber = route.params.invoiceNumber;
	await invoiceStore.getInvoiceByInvoiceNumber({
		invoiceNumber
	});
})


async function saveInvoice(){
	const invoiceNumber = route.params.invoiceNumber;

	try {
		await invoiceStore.updateInvoice({
			invoiceNumber,
		});

		router.push(`/invoice/${invoiceNumber}`)

		toast.add(
			{
				severity: "info",
				summary: 'Rechnung geändert.',
				detail: `Rechnung mit der Rechnungsnummer: ${invoiceNumber} wurde geändert.`,
				life: 5000
			}
		);
	}
	catch (error) {
		toast.add(
			{
				severity: "error",
				summary: 'Rechnung wurde nicht geändert.',
				detail: error.response.message,
				life: 5000
			}
		);
	}
}

async function cancelEdit(){
	const invoiceNumber = route.params.invoiceNumber;

	await invoiceStore.getInvoiceByInvoiceNumber({
		invoiceNumber,
	})

	router.push(`/invoice/${invoiceNumber}`);
}
</script>


<template>
	<PageContainer v-if="invoiceStore.invoice.customer?.customerType">
		<form>
			<!-- customer overview -->
			<section>
				<h2>Kunde Vorschau</h2>

				<div class="item-group-1-column" v-if="invoiceStore.invoice.customer.customerType === 'company'">
					<div class="item">
						<div class="item-label">Name</div>

						<div class="item-value">
							{{invoiceStore.invoice.customer.companyName}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">Ansprechpartner</div>

						<div class="item-value">
							{{invoiceStore.invoice.customer.contactPerson}}
						</div>
					</div>
				</div>

				<div class="item-group-1-column" v-if="invoiceStore.invoice.customer.customerType === 'private'">
					<div class="item">
						<div class="item-label">Name</div>

						<div class="item-value">
							{{invoiceStore.invoice.customer.firstName}} {{invoiceStore.invoice.customer.lastName}}
						</div>
					</div>
				</div>

				<div class="item-group-1-column">
					<div class="item">
						<div class="item-label">
							Straße
						</div>

						<div class="item-value">
							{{invoiceStore.invoice.customer.street}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Postleitzahl
						</div>

						<div class="item-value">
							{{invoiceStore.invoice.customer.postalCode}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Wohnort
						</div>

						<div class="item-value">
							{{invoiceStore.invoice.customer.city}}
						</div>
					</div>
				</div>
			</section>

			<Divider />

			<!--.invoiceDraft data -->
			<section>
				<h2>Rechnungs Daten</h2>

				<div class="item-group">
					<div class="item">
						<div class="item-label">
							Rechnungs Nummer
						</div>

						<div class="item-value">
							{{invoiceStore.invoice.invoiceNumber}}
						</div>
					</div>
				</div>

				<div class="input-group">
					<div class="input">
						<label for="currency">Währung</label>

						<SelectCurrency
							v-model="invoiceStore.invoiceDraft.currency"
						/>
					</div>
				</div>

				<div class="input-group">
					<div class="input">
						<label for="invoiceDate">Rechnungs Datum</label>

						<DatePicker
							v-model="invoiceStore.invoiceDraft.invoiceDate"
						/>
					</div>

					<div class="input">
						<label for="invoiceDate">Fällig bis</label>

						<DatePicker
							v-model="invoiceStore.invoiceDraft.dueDate"
						/>
					</div>
				</div>
			</section>

			<Divider />

			<!-- items -->
			<section>
				<h2>Positionen</h2>

				<LineItems
					v-model="invoiceStore.invoiceDraft.items"
				/>
			</section>

			<Divider />

			<!-- Payment -->
			<section>
				<h2>Zahlung</h2>

				<SelectPaymentMethod
					v-model="invoiceStore.invoiceDraft.payment.method"
				/>

				<div class="item-group-1-column">
					<div class="item">
						<div class="item-label">
							Gezahlt
						</div>

						<div class="item-value">
							{{invoiceStore.invoiceDraft.payment.paidAmount}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Offener Betrag
						</div>

						<div class="item-value">
							{{invoiceStore.invoiceDraft.payment.openAmount}}
						</div>
					</div>

					<div class="item">
						<div class="item-label">
							Zahlungs Status
						</div>

						<div class="item-value">
							{{invoiceStore.invoiceDraft.payment.status}}
						</div>
					</div>
				</div>
			</section>

			<Divider />

			<!-- Text -->
			<section>
				<h2>Text</h2>

				<div class="input-group">
					<div class="input">
						<label for="note">Notiz</label>

						<Textarea
							v-model="invoiceStore.invoiceDraft.note"
						/>
					</div>
				</div>
			</section>

			<!-- actions -->
			<section>
				<div class="action-buttons">
					<Button
						label="Abbrechen"
						severity="secondary"
						@click="cancelEdit"
					/>

					<Button
						label="Speichern"
						@click="saveInvoice"
					/>
				</div>
			</section>
		</form>
	</PageContainer>
</template>


<style lang="scss" scoped>
.action-buttons {
	display: flex;
	justify-content: flex-end;
	gap: var(--space-md);
	margin-top: var(--space-xl2);
}
</style>
