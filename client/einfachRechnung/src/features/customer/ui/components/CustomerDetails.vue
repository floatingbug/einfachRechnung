<script setup>
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";

import { useCustomerStore } from "../../store/useCustomerStore.js";

const customerStore = useCustomerStore();


async function updateCustomer(){
	try{
		const result = await customerStore.updateCustomer();


	}
	catch(error){
		console.log("--->", error);
	}

}

</script>

<template>
	<div
		v-if="customerStore.editCustomer"
		class="customer-details"
	>
		<h1>Kunden Details</h1>

		<form>
			<div class="field">
				<label for="customer-id">ID</label>
				<InputText
					id="customer-id"
					:model-value="customerStore.editCustomer.id"
					disabled
				/>
			</div>

			<div class="field">
				<label for="customer-name">Name</label>
				<InputText
					id="customer-name"
					v-model="customerStore.editCustomer.name"
				/>
			</div>

			<div class="field">
				<label for="customer-street">Street</label>
				<InputText
					id="customer-street"
					v-model="customerStore.editCustomer.street"
				/>
			</div>

			<div class="field">
				<label for="customer-postal-code">Postal Code</label>
				<InputNumber
					id="customer-postal-code"
					v-model="customerStore.editCustomer.postalCode"
					:use-grouping="false"
				/>
			</div>

			<div class="field">
				<label for="customer-city">City</label>
				<InputText
					id="customer-city"
					v-model="customerStore.editCustomer.city"
				/>
			</div>

			<div class="field">
				<label for="customer-country-code">Country Code</label>
				<InputText
					id="customer-country-code"
					v-model="customerStore.editCustomer.countryCode"
				/>
			</div>

			<div class="field">
				<label for="customer-phone">Phone</label>
				<InputNumber
					id="customer-phone"
					v-model="customerStore.editCustomer.phone"
					:use-grouping="false"
				/>
			</div>

			<div class="field">
				<label for="customer-email">Email</label>
				<InputText
					id="customer-email"
					v-model="customerStore.editCustomer.email"
				/>
			</div>

			<div class="field">
				<label for="customer-vat-id">VAT ID</label>
				<InputText
					id="customer-vat-id"
					v-model="customerStore.editCustomer.vatId"
				/>
			</div>
		</form>

		<Button class="submit-button"
			type="submit"
			label="Update Kunde"
			@click="updateCustomer"
		/>
	</div>
</template>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.customer-details {
	display: flex;
	flex-direction: column;
}

form {
	display: grid;

	@include media.up(bp.$bp-md){
		grid-template-columns: 1fr 1fr;
		grid-column-gap: var(--space-xl);
		grid-row-gap: var(--space-md);

		margin-top: var(--space-xl2);
	}
}

.field {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.submit-button {
	margin-top: var(--space-xl2);
	margin-left: auto;
}
</style>
