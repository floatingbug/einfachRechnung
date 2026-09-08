<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {useOfferStore} from "../../../store";
import InputText from 'primevue/inputtext';
import DatePicker from "primevue/datepicker";
import {LineItems, SelectCustomer} from "@/shared/components";
import Textarea from "primevue/textarea";
import {useSettingsStore} from "@/features/settings/store/useSettingsStore.js";
import {useToast} from "primevue/usetoast";


const offerStore = useOfferStore();
const settingsStore = useSettingsStore();
const router = useRouter();
const customer = ref();
const offer = ref();
const itemSettings = ref();
const toast = useToast();


onMounted(async () => {
	try {
		const taxSettings = await settingsStore.getTax();
		itemSettings.value = {
			taxRate: taxSettings.defaultVatRate,
		};

		offer.value = await offerStore.getOfferTemplate();

		const date = new Date();
		const validUntil = new Date(date);
		validUntil.setDate(date.getDate() + offer.value.validityDays);

		offer.value.offerDate = date;
		offer.value.validUntil = validUntil;
		offer.value.project = "";
		offer.value.items = [];
	}
	catch {
		toast.add({severity: "error", summary: "Fehler", detail: "Angebotsvorgaben konnten nicht geladen werden.", life: 5000});
	}
});


function onCustomerSelected(event){
	customer.value = event;
	offer.value.customerId = customer.value.id;
}

async function saveOffer(){
	try{
		const offerNumber = await offerStore.saveOffer({
			offer: offer.value,
		});

		router.push(`/offer/details/${offerNumber}`);
	}
	catch {
		toast.add({severity: "error", summary: "Fehler", detail: "Angebot konnte nicht gespeichert werden.", life: 5000});
	}
}

</script>

<template>
	<div class="create-offer-form">
		<section class="first-section">
			<div class="first-section-content">
				<h2>Kunde auswählen</h2>

				<div class="actions-top">
					<SelectCustomer class="customer-select"
						@customerSelected="onCustomerSelected"
					/>

					<Button class="add-customer"
						label="Kunde hinzufügen"
					/>
				</div>

				<Divider v-if="customer" />

				<div class="customer-preview" v-if="customer?.customerType === 'private'">
					<h2>Kunde</h2>

					<div class="customer-items-group">
						<p>Vorname: {{customer.firstName}}</p>
						<p>Nachname: {{customer.lastName}}</p>
						<p>E-mail: {{customer.email}}</p>
					</div>

					<div class="customer-items-group">
						<p>Straße: {{customer.street}}</p>
						<p>Postleitzahl: {{customer.postalCode}}</p>
						<p>Stadt: {{customer.city}}</p>
					</div>
				</div>

				<div class="customer-preview" v-if="customer?.customerType === 'company'">
					<h2>Kunde</h2>

					<div class="customer-items-group">
						<p>Firmenname: {{customer.companyName}}</p>
						<p>Kontaktperson: {{customer.contactPerson}}</p>
						<p>E-mail: {{customer.email}}</p>
					</div>

					<div class="customer-items-group">
						<p>Straße: {{customer.street}}</p>
						<p>Postleitzahl: {{customer.postalCode}}</p>
						<p>Stadt: {{customer.city}}</p>
					</div>
				</div>

				<Divider />
			</div>

		</section>


		<div class="form-container">
			<form v-if="customer"
				@submit.prevent="onSubmit"
			>
				<section>
					<h2>Angebotsdaten</h2>

					<div class="input-group">
						<div class="input">
							<label for="offerDate">Angebotsdatum</label>

							<DatePicker
								v-model="offer.offerDate"
								inline
							/>
						</div>

						<div class="input">
							<label for="validUntil">Gültig bis</label>
							<DatePicker
								v-model="offer.validUntil"
								inline
							/>
						</div>
					</div>
				</section>

				<Divider />

				<section>
					<h2>Projekt (optional)</h2>

					<InputText
						v-model="offer.project"
						placeholder="z. B. Badsanierung Musterstraße"
					/>
				</section>

					<Divider />

				<section>
					<h2>Einleitung</h2>

					<Textarea
						v-model="offer.introduction"
						rows="3"
						autoResize
					/>
				</section>

				<Divider />

				<section>
					<h2>Positionen</h2>

					<LineItems
						v-model="offer.items"
						:itemSettings="itemSettings"
						@newItems="onNewItems($event)"
					/>
				</section>

				<Divider />

				<section>
					<h2>Schluss</h2>

					<Textarea
						v-model="offer.closing"
						rows="3"
						autoResize
					/>
				</section>

				<Divider />

				<section>
					<div class="action-buttons">
						<Button
							label="Angebot speichern"
							@click="saveOffer"
						/>
					</div>
				</section>
			</form>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;
.first-section {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.first-section-content {
	width: 100%;
	max-width: 1024px;
}

.create-offer-form {
	width: 100%;
}

.form-container {
	width: 100%;
	display: flex;
	justify-content: center;
}

.actions-top {
	max-width: 600px;
	display: grid;
	gap: var(--space-md);

	@include media.up(bp.$bp_md) {
		grid-template-columns: 1fr auto;
	}
}

.customer-preview {
	max-width: 800px;

	@include media.up(bp.$bp-md) {
		display: grid;
		grid-template-columns: 1fr 1fr;

		h2 {
			grid-column: 1 / -1;
		}
	}
}

.action-buttons {
	display: flex;
	justify-content: flex-end;
	gap: var(--space-md);
	margin-top: var(--space-xl);
	margin-left: auto;
}
</style>
