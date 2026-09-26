<script setup>
import {ref, watch} from "vue";
import { PageContainer } from '@/shared/components';
import {
	InputText,
	Select,
	Message,
	Divider,
	Button
} from 'primevue';
import {SelectCountry} from "@/shared/components";


const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
	errors: {
		type: Object,
		default: () => ({}),
	}
});


const emit = defineEmits([ "update:modelValue", "saveCustomer" ]);


const localErrors = ref({});


watch(
	() => props.errors,
	(errors) => {
		localErrors.value = { ...errors };
	},
	{ immediate: true }
);


function onUpdateModelValue(event, field){
	const updatedCustomer = {
		...props.modelValue,
		[field]: event,
	};

	delete localErrors.value[field];

	if (field === "customerType") {
		delete localErrors.value.companyName;
		delete localErrors.value.contactPerson;
		delete localErrors.value.firstName;
		delete localErrors.value.lastName;
	}

	emit("update:modelValue", updatedCustomer);
}


function onUpdateBankValue(event, field){
	const updatedCustomer = {
		...props.modelValue,
		bank: {
			...props.modelValue.bank,
			[field]: event,
		},
	};

	delete localErrors.value[`bank.${field}`];

	emit("update:modelValue", updatedCustomer);
}


const customerTypeOptions = ref([
	{
		label: "Firma",
		value: "company",
	},
	{
		label: "Privat Kunde",
		value: "private",
	},
]);

</script>


<template>
	<PageContainer>
		<section class="first-section">
			<div class="select-customer-type">
				<h2>Kundentyp Auswählen</h2>

				<Select
					:modelValue="modelValue.customerType"
					@update:modelValue="onUpdateModelValue($event, 'customerType')"
					:options="customerTypeOptions"
					optionLabel="label"
					optionValue="value"
					placeholder="Kundentyp"
				/>
			</div>

			<Message
				v-for="error in localErrors.customerType"
				:key="error"
				severity="error"
			>
				{{ error }}
			</Message>
		</section>

		<form v-if="modelValue.customerType">
			<section>
				<h2>Kunde</h2>

				<div
					class="input-group"
					v-if="modelValue.customerType === 'company'"
				>
					<div class="input">
						<label for="company">Firma</label>

						<InputText
							:modelValue="modelValue.companyName"
							@update:modelValue="onUpdateModelValue($event, 'companyName')"
						/>

						<Message
							v-for="error in localErrors.companyName"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>

					<div class="input">
						<label for="contactPerson">Ansprechpartner</label>

						<InputText
							:modelValue="modelValue.contactPerson"
							@update:modelValue="onUpdateModelValue($event, 'contactPerson')"
						/>

						<Message
							v-for="error in localErrors.contactPerson"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>
				</div>

				<div
					class="input-group"
					v-if="modelValue.customerType === 'private'"
				>
					<div class="input">
						<label for="firstName">Vorname</label>

						<InputText
							:modelValue="modelValue.firstName"
							@update:modelValue="onUpdateModelValue($event, 'firstName')"
						/>

						<Message
							v-for="error in localErrors.firstName"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>

					<div class="input">
						<label for="lastName">Nachname</label>

						<InputText
							:modelValue="modelValue.lastName"
							@update:modelValue="onUpdateModelValue($event, 'lastName')"
						/>

						<Message
							v-for="error in localErrors.lastName"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>
				</div>
			</section>

			<Divider />

			<section>
				<h2>Anschrift</h2>

				<div class="input-group">
					<div class="input">
						<label for="street">Straße, Hausnummer</label>

						<InputText
							:modelValue="modelValue.street"
							@update:modelValue="onUpdateModelValue($event, 'street')"
						/>

						<Message
							v-for="error in localErrors.street"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>

					<div class="input">
						<label for="postalCode">Postleitzahl</label>

						<InputText
							:modelValue="modelValue.postalCode"
							@update:modelValue="onUpdateModelValue($event, 'postalCode')"
						/>

						<Message
							v-for="error in localErrors.postalCode"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>

					<div class="input">
						<label for="city">Wohnort</label>

						<InputText
							:modelValue="modelValue.city"
							@update:modelValue="onUpdateModelValue($event, 'city')"
						/>

						<Message
							v-for="error in localErrors.city"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>

					<div class="input">
						<label for="phone">Telefonnummer</label>

						<InputText
							:modelValue="modelValue.phone"
							@update:modelValue="onUpdateModelValue($event, 'phone')"
						/>

						<Message
							v-for="error in localErrors.phone"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>

					<div class="input">
						<label for="email">E-Mail</label>

						<InputText
							:modelValue="modelValue.email"
							@update:modelValue="onUpdateModelValue($event, 'email')"
							type="email"
						/>

						<Message
							v-for="error in localErrors.email"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>

					<div class="input">
						<label for="countryCode">Länder Code</label>

						<SelectCountry
							:modelValue="modelValue.countryCode"
							@update:modelValue="onUpdateModelValue($event, 'countryCode')"
						/>

						<Message
							v-for="error in localErrors.countryCode"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>
				</div>
			</section>

			<Divider />

			<section>
				<h2>Bank</h2>

				<div class="input-group">
					<div class="input">
						<label for="bankName">Name</label>

						<InputText
							:modelValue="modelValue.bank?.bankName"
							@update:modelValue="onUpdateBankValue($event, 'bankName')"
						/>

						<Message
							v-for="error in localErrors['bank.bankName']"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>

					<div class="input">
						<label for="iban">IBAN</label>

						<InputText
							:modelValue="modelValue.bank?.iban"
							@update:modelValue="onUpdateBankValue($event, 'iban')"
						/>

						<Message
							v-for="error in localErrors['bank.iban']"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>

					<div class="input">
						<label for="bic">BIC</label>

						<InputText
							:modelValue="modelValue.bank?.bic"
							@update:modelValue="onUpdateBankValue($event, 'bic')"
						/>

						<Message
							v-for="error in localErrors['bank.bic']"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>
				</div>
			</section>

			<Divider />

			<section>
				<h2>Steuerdaten</h2>

				<div class="input-group">
					<div class="input">
						<label for="vatId">StIdNr.</label>

						<InputText
							:modelValue="modelValue.vatId"
							@update:modelValue="onUpdateModelValue($event, 'vatId')"
						/>

						<Message
							v-for="error in localErrors.vatId"
							:key="error"
							severity="error"
						>
							{{ error }}
						</Message>
					</div>
				</div>
			</section>

			<div class="form-action-buttons">
				<Button
					label="Kunde hinzufügen"
					@click="emit('saveCustomer')"
				/>
			</div>
		</form>
	</PageContainer>
</template>


<style lang="scss" scoped>
.first-section {
	width: 100%;
	max-width: 1024px;
}

.select-customer-type {
	max-width: 420px;
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}

.form-action-buttons {
	display: flex;
	justify-content: flex-end;
	margin-top: var(--space-xl2);
}
</style>
