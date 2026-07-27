<script setup>
import {ref, onMounted} from "vue";
import {useOfferStore} from "../../../store";
import SelectCustomer from './components/SelectCustomer.vue';
import InputText from 'primevue/inputtext';
import DatePicker from "primevue/datepicker";
import {LineItems} from "@/shared/components";
import Textarea from "primevue/textarea";


const offerStore = useOfferStore();
const customer = ref();
const offer = ref();
const offerSettings = ref();


onMounted(async () => {
	try {
		offer.value = await offerStore.getOfferTemplate();

		const date = new Date();
		const validUntil = new Date(date);
		validUntil.setDate(date.getDate() + offer.value.defaultValidityDays);
		offer.value.offerDate = date;
		offer.value.validUntil = validUntil;

		console.log(offer.value);
	}
	catch (error) {
		console.log(error);
	}
});


function onCustomerSelected(event){
	customer.value = event;
	offer.value.customerId = customer.value.id;
}

function onNewItems(event){
	offer.value.items = event;
}

async function saveOffer(){
	try{
		const savedOffer = await offerStore.saveOffer({
			offer: offer.value,
		});

		console.log(savedOffer);
	}
	catch(error){
		console.log(error);
	}
}

function previewOffer(){

}

function saveAndSendOffer(){

}

</script>

<template>
	<div class="create-offer-form">
		<div class="actions-top">
			<h2>Kunde auswählen</h2>

			<SelectCustomer class="customer-select"
				@customerSelected="onCustomerSelected"
			/>

			<Button class="add-customer"
				label="Kunde hinzufügen"
			/>
		</div>

		<Divider />

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
		</div> <div class="customer-preview" v-if="customer?.customerType === 'company'">
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

		<form v-if="customer"
			@submit.prevent="onSubmit"
		>
			<div class="input-group">
				<h2>Angebotsdaten</h2>

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

			<Divider />

			<div class="input-group">
				<h2>Projekt (optional)</h2>

				<InputText
					v-model="offer.project"
					placeholder="z. B. Badsanierung Musterstraße"
				/>
			</div>

			<Divider />

			<div class="input-group">
				<h2>Einleitung</h2>

				<Textarea
					v-model="offer.introduction"
					rows="3"
					autoResize
				/>
			</div>

			<Divider />

			<div>
				<h2>Positionen</h2>

				<LineItems
					:items="offer.items"
					:offerSettings="offerSettings"
					@newItems="onNewItems($event)"
				/>
			</div>

			<Divider />

			<div class="input-group">
				<h2>Schluss</h2>

				<Textarea
					v-model="offer.closing"
					rows="3"
					autoResize
				/>
			</div>

			<Divider />

			<div class="action-buttons">
				<Button
					label="Vorschau"
					@click="previewOffer"
				/>

				<Button
					label="Angebot speichern"
					@click="saveOffer"
				/>

				<Button
					label="Speichern und Senden"
					@click="saveAndSendOffer"
				/>
			</div>
		</form>
	</div>
</template>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.create-offer-form {
	width: 100%;
	min-width: 0;
	max-width: 1400px;
}

.actions-top {
	max-width: 600px;
	display: grid;
	grid-template-columns: 1fr auto;
	gap: var(--space-md);
	margin: var(--space-xl2) 0 var(--space-xl2) 0;

	h2 {
		grid-column: 1 / -1;
	}

	.add-customer {
		flex-shrink: 0;
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
