<script setup>
import {ref} from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Message from "primevue/message";

// TODO: use validator
// import {validateCompany} from "@/features/settings/domainRules";


const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	},
});


const emit = defineEmits([
	"action",
	"update:modelValue",
]);


const errors = ref({});


// --- model ---

function updateField(field, value) {
	emit("update:modelValue", {
		...props.modelValue,
		[field]: value,
	});
}


function updateBankField(field, value) {
	emit("update:modelValue", {
		...props.modelValue,
		bank: {
			...props.modelValue.bank,
			[field]: value,
		},
	});
}


// --- submit ---

function onSubmit() {
	emit("action", {
		action: "updateCompany",
	});
}
</script>


<template>
	<form>
		<h2>Firmendaten</h2>

		<div class="input-group">
			<div class="input">
				<label>Firmenname</label>

				<InputText
					:modelValue="modelValue.companyName"
					@update:modelValue="updateField('companyName', $event)"
				/>

				<Message
					v-if="errors.companyName"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.companyName }}
				</Message>
			</div>


			<div class="input">
				<label>Inhaber</label>

				<InputText
					:modelValue="modelValue.ownerName"
					@update:modelValue="updateField('ownerName', $event)"
				/>

				<Message
					v-if="errors.ownerName"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.ownerName }}
				</Message>
			</div>


			<div class="input">
				<label>E-Mail</label>

				<InputText
					:modelValue="modelValue.email"
					@update:modelValue="updateField('email', $event)"
				/>

				<Message
					v-if="errors.email"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.email }}
				</Message>
			</div>


			<div class="input">
				<label>Telefon</label>

				<InputText
					:modelValue="modelValue.phone"
					@update:modelValue="updateField('phone', $event)"
				/>

				<Message
					v-if="errors.phone"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.phone }}
				</Message>
			</div>


			<div class="input">
				<label>Website</label>

				<InputText
					:modelValue="modelValue.website"
					@update:modelValue="updateField('website', $event)"
				/>

				<Message
					v-if="errors.website"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.website }}
				</Message>
			</div>
		</div>


		<Divider />


		<h2>Adresse</h2>

		<div class="input-group">
			<div class="input">
				<label>Straße</label>

				<InputText
					:modelValue="modelValue.street"
					@update:modelValue="updateField('street', $event)"
				/>

				<Message
					v-if="errors.street"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.street }}
				</Message>
			</div>


			<div class="input">
				<label>Stadt</label>

				<InputText
					:modelValue="modelValue.city"
					@update:modelValue="updateField('city', $event)"
				/>

				<Message
					v-if="errors.city"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.city }}
				</Message>
			</div>


			<div class="input">
				<label>Postleitzahl</label>

				<InputText
					:modelValue="modelValue.postalCode"
					@update:modelValue="updateField('postalCode', $event)"
				/>

				<Message
					v-if="errors.postalCode"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.postalCode }}
				</Message>
			</div>


			<div class="input">
				<label>Ländercode</label>

				<InputText
					:modelValue="modelValue.countryCode"
					@update:modelValue="updateField('countryCode', $event)"
				/>

				<Message
					v-if="errors.countryCode"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.countryCode }}
				</Message>
			</div>
		</div>


		<Divider />


		<h2>Bankverbindung</h2>

		<div class="input-group">
			<div class="input">
				<label for="bankName">Bank Name</label>

				<InputText
					id="bankName"
					:modelValue="modelValue.bank?.bankName"
					@update:modelValue="updateBankField('bankName', $event)"
				/>
			</div>


			<div class="input">
				<label for="iban">IBAN</label>

				<InputText
					id="iban"
					:modelValue="modelValue.bank?.iban"
					@update:modelValue="updateBankField('iban', $event)"
				/>
			</div>


			<div class="input">
				<label for="bic">BIC</label>

				<InputText
					id="bic"
					:modelValue="modelValue.bank?.bic"
					@update:modelValue="updateBankField('bic', $event)"
				/>
			</div>
		</div>


		<Divider />

		<h2>Steuerdaten</h2>

		<div class="input-group">
			<div class="input">
				<label>USt-ID</label>

				<InputText
					:modelValue="modelValue.vatId"
					@update:modelValue="updateField('vatId', $event)"
				/>

				<Message
					v-if="errors.vatId"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.vatId }}
				</Message>
			</div>


			<div class="input">
				<label>Steuernummer</label>

				<InputText
					:modelValue="modelValue.taxNumber"
					@update:modelValue="updateField('taxNumber', $event)"
				/>

				<Message
					v-if="errors.taxNumber"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.taxNumber }}
				</Message>
			</div>
		</div>

		<Divider />

		<div class="actions">
			<Button
				type="button"
				label="Speichern"
				icon="pi pi-save"
				@click="onSubmit"
			/>
		</div>
	</form>
</template>


<style scoped lang="scss">
.actions {
	display: flex;
	justify-content: flex-end;
	margin-top: var(--space-md);
}
</style>
