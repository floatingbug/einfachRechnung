<script setup>
import { useCustomerStore } from "../../store/useCustomerStore.js";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Card from "primevue/card";
import Button from "primevue/button";
import Message from "primevue/message";

const emit = defineEmits(["submit"]);

const customerStore = useCustomerStore();

function handleSubmit(){
	emit("submit");
}

function getError(field){
	return customerStore.errors?.[field]?.[0];
}
</script>

<template>
	<Card>
		<template #title>
			Kunde erstellen
		</template>

		<template #content>
			<form @submit.prevent="handleSubmit">

				<!-- NAME -->
				<div class="input">
					<label for="name">Vorname / Nachname</label>
					<InputText
						id="name"
						v-model="customerStore.draftCustomer.name"
					/>
					<Message
						v-if="getError('name')"
						severity="error"
					>
						{{ getError('name') }}
					</Message>
				</div>

				<!-- STREET -->
				<div class="input">
					<label for="street">Straße / Hausnummer</label>
					<InputText
						id="street"
						v-model="customerStore.draftCustomer.street"
					/>
					<Message
						v-if="getError('street')"
						severity="error"
					>
						{{ getError('street') }}
					</Message>
				</div>

				<!-- POSTAL CODE -->
				<div class="input">
					<label for="postalCode">Postleitzahl</label>
					<InputNumber
						id="postalCode"
						v-model="customerStore.draftCustomer.postalCode"
					/>
					<Message
						v-if="getError('postalCode')"
						severity="error"
					>
						{{ getError('postalCode') }}
					</Message>
				</div>

				<!-- CITY -->
				<div class="input">
					<label for="city">Stadt</label>
					<InputText
						id="city"
						v-model="customerStore.draftCustomer.city"
					/>
					<Message
						v-if="getError('city')"
						severity="error"
					>
						{{ getError('city') }}
					</Message>
				</div>

				<!-- COUNTRY CODE -->
				<div class="input">
					<label for="countryCode">Bundesland</label>
					<InputText
						id="countryCode"
						v-model="customerStore.draftCustomer.countryCode"
					/>
					<Message
						v-if="getError('countryCode')"
						severity="error"
					>
						{{ getError('countryCode') }}
					</Message>
				</div>

				<!-- PHONE -->
				<div class="input">
					<label for="phone">Tel.</label>
					<InputNumber
						id="phone"
						v-model="customerStore.draftCustomer.phone"
					/>
					<Message
						v-if="getError('phone')"
						severity="error"
					>
						{{ getError('phone') }}
					</Message>
				</div>

				<!-- EMAIL -->
				<div class="input">
					<label for="email">E-Mail</label>
					<InputText
						id="email"
						v-model="customerStore.draftCustomer.email"
					/>
					<Message
						v-if="getError('email')"
						severity="error"
					>
						{{ getError('email') }}
					</Message>
				</div>

				<!-- VAT ID -->
				<div class="input">
					<label for="vatId">USt-IdNr.</label>
					<InputNumber
						id="vatId"
						v-model="customerStore.draftCustomer.vatId"
					/>
					<Message
						v-if="getError('vatId')"
						severity="error"
					>
						{{ getError('vatId') }}
					</Message>
				</div>

				<!-- ACTIONS -->
				<div class="actions">
					<Button
						label="Erstellen"
						type="submit"
					/>
				</div>

			</form>
		</template>
	</Card>
</template>

<style scoped lang="scss">
form{
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
	margin-top: var(--space-xl);
}

.p-card {
	width: 100%;
}

.input {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.actions {
	margin-top: var(--space-xl);

	.p-button {
		width: 100%;
	}
}
</style>
