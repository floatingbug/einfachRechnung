<script setup>
import {
	ref,
	watch,
	toRaw,
	computed,
} from "vue";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Divider from "primevue/divider";
import Button from "primevue/button";
import Message from "primevue/message";
import Select from "primevue/select";

import {validateInvoice} from "@/features/settings/domainRules";
import {invoiceNumberFormatOptions} from "../options";


const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});


const emit = defineEmits([
	"submit",
]);


// --------------------
// state
// --------------------
const form = ref({});
const errors = ref({});


// --------------------
// sync props -> form
// --------------------
watch(
	() => props.data,
	(value) => {
		form.value = structuredClone(
			toRaw(value)
		);
	},
	{
		immediate: true,
	},
);


// --------------------
// invoice number preview
// --------------------
const invoiceNumberPreview = computed(() => {
	if (!form.value) {
		return "";
	}

	const prefix = form.value.invoicePrefix ?? "";

	const format = form.value.invoiceNumberFormat ?? "";

	return format
		.replace("{prefix}", prefix)
		.replace("{year}", "2026")
		.replace("{number}", "00015");
});


// --------------------
// submit
// --------------------
function onSubmit(){
	const result = validateInvoice({
		invoiceSettings: form.value,
	});

	errors.value = result.errors;

	if(!result.valid){
		return;
	}

	emit(
		"submit",
		{
			data: result.data,
		}
	);
}
</script>


<template>
	<form>
		<h2>Rechnungsnummer</h2>

		<div class="input-group">

			<div class="input">
				<label for="invoicePrefix">
					Präfix (optional)
				</label>

				<InputText
					id="invoicePrefix"
					v-model="form.invoicePrefix"
					:placeholder="form.invoicePrefix"
				/>

				<Message
					v-if="errors.invoicePrefix"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.invoicePrefix }}
				</Message>

				<p>Beispiel: R oder RE</p>
			</div>


			<div class="input">
				<label for="invoiceNumberFormat">
					Nummernformat
				</label>

				<Select
					id="invoiceNumberFormat"
					v-model="form.invoiceNumberFormat"
					:options="invoiceNumberFormatOptions"
					optionLabel="label"
					optionValue="value"
				/>

				<Message
					v-if="errors.invoiceNumberFormat"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.invoiceNumberFormat }}
				</Message>
			</div>


			<div class="invoice-number-preview">
				<p>Vorschau</p>

				<Message severity="secondary">
					{{ invoiceNumberPreview }}
				</Message>
			</div>

		</div>


		<Divider />


		<h2>Zahlung</h2>

		<div class="input-group">

			<div class="input">
				<label for="defaultPaymentTermsDays">
					Zahlungsziel (Tage)
				</label>

				<InputNumber
					id="defaultPaymentTermsDays"
					v-model="form.defaultPaymentTermsDays"
				/>

				<Message
					v-if="errors.defaultPaymentTermsDays"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.defaultPaymentTermsDays }}
				</Message>
			</div>


			<div class="input">
				<label for="defaultDueDays">
					Fälligkeit (Tage)
				</label>

				<InputNumber
					id="defaultDueDays"
					v-model="form.defaultDueDays"
				/>

				<Message
					v-if="errors.defaultDueDays"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.defaultDueDays }}
				</Message>
			</div>

		</div>


		<Divider />


		<div class="input-group">

			<div class="input">
				<label for="currency">
					Standard-Währung
				</label>

				<InputText
					id="currency"
					v-model="form.currency"
				/>

				<Message
					v-if="errors.currency"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.currency }}
				</Message>
			</div>


			<div class="input">
				<label for="language">
					Sprache
				</label>

				<InputText
					id="language"
					v-model="form.language"
				/>

				<Message
					v-if="errors.language"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.language }}
				</Message>
			</div>


			<div class="input">
				<label for="defaultTaxRate">
					Standard-Steuersatz (%)
				</label>

				<InputNumber
					id="defaultTaxRate"
					v-model="form.defaultTaxRate"
				/>

				<Message
					v-if="errors.defaultTaxRate"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.defaultTaxRate }}
				</Message>
			</div>

		</div>


		<div class="actions">
			<Button
				label="Speichern"
				icon="pi pi-save"
				@click="onSubmit"
			/>
		</div>

	</form>
</template>


<style scoped lang="scss">
.settings-form {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1rem;
}

.field {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
}

.invoice-number-preview {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
}

.actions {
	display: flex;
	justify-content: flex-end;
}
</style>
