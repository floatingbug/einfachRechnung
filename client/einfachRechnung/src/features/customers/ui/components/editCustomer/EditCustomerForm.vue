<script setup>
import { InputText } from 'primevue'

defineProps({
	customer: {
		type: Object,
	},
})

const emit = defineEmits(['update:customer', "submit", "cancel"])

function updateCustomer(field, value) {
	emit('update:customer', {
		field,
		value,
	})
}
</script>

<template>
	<form v-if="customer">
		<section v-if="customer.customerType === 'company'">
			<h2>Name</h2>

			<div class="input-group">
				<div class="input">
					<label for="company">Firma</label>

					<InputText
						:modelValue="customer.companyName"
						@update:modelValue="updateCustomer('companyName', $event)"
					/>
				</div>

				<div class="input">
					<label for="contactPerson">Ansprechpartner</label>

					<InputText
						:modelValue="customer.contactPerson"
						@update:modelValue="updateCustomer('contactPerson', $event)"
					/>
				</div>
			</div>
		</section>

		<section v-else>
			<h2>Name</h2>

			<div class="input-group">
				<div class="input">
					<label for="firstName">Vorname</label>

					<InputText
						:modelValue="customer.firstName"
						@update:modelValue="updateCustomer('firstName', $event)"
					/>
				</div>

				<div class="input">
					<label for="lastName">Nachname</label>

					<InputText
						:modelValue="customer.lastName"
						@update:modelValue="updateCustomer('lastName', $event)"
					/>
				</div>
			</div>
		</section>

		<Divider />

		<section>
			<h2>Kontakt</h2>

			<div class="input-group">
				<div class="input">
					<label for="street">Straße</label>

					<InputText
						:modelValue="customer.street"
						@update:modelValue="updateCustomer('street', $event)"
					/>
				</div>

				<div class="input">
					<label for="city">Wohnort</label>

					<InputText
						:modelValue="customer.city"
						@update:modelValue="updateCustomer('city', $event)"
					/>
				</div>

				<div class="input">
					<label for="postalCode">Postleitzahl</label>

					<InputText
						:modelValue="customer.postalCode"
						@update:modelValue="updateCustomer('postalCode', $event)"
					/>
				</div>

				<div class="input">
					<label for="email">E-Mail</label>

					<InputText
						:modelValue="customer.email"
						@update:modelValue="updateCustomer('email', $event)"
					/>
				</div>

				<div class="input">
					<label for="phone">Telefon</label>

					<InputText
						:modelValue="customer.phone"
						@update:modelValue="updateCustomer('phone', $event)"
					/>
				</div>

				<div class="input">
					<label for="countryCode">Ländercode</label>

					<InputText
						:modelValue="customer.countryCode"
						@update:modelValue="updateCustomer('countryCode', $event)"
					/>
				</div>
			</div>
		</section>

		<Divider />

		<section>
			<h2>Bankverbindung</h2>

			<div class="input-group">
				<div class="input">
					<label for="bankName">Bankname</label>

					<InputText
						:modelValue="customer.bank.bankName"
						@update:modelValue="updateCustomer('bankName', $event)"
					/>
				</div>

				<div class="input">
					<label for="iban">IBAN</label>

					<InputText
						:modelValue="customer.bank.iban"
						@update:modelValue="updateCustomer('iban', $event)"
					/>
				</div>

				<div class="input">
					<label for="bic">BIC</label>

					<InputText
						:modelValue="customer.bank.bic"
						@update:modelValue="updateCustomer('bic', $event)"
					/>
				</div>
			</div>
		</section>

		<Divider />

		<section>
			<h2>Steuer</h2>

			<div class="input-group">
				<div class="input">
					<label for="vatId">StIdNr.</label>

					<InputText
						:modelValue="customer.vatId"
						@update:modelValue="updateCustomer('vatId', $event)"
					/>
				</div>
			</div>
		</section>

		<Divider />

		<section>
			<div class="form-actions">
				<Button
					label="Abbrechen"
					severity="secondary"
					@click="emit('cancel')"
				/>

				<Button
					label="Änderung speichertn"
					@click="emit('submit')"
				/>
			</div>
		</section>
	</form>
</template>

<style lang="scss" scoped>
.form-actions {
	display: flex;
	justify-content: flex-end;
	gap: var(--space-md);
}
</style>
