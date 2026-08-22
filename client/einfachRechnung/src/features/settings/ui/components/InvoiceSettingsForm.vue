<script setup>
import {
	ref,
	computed,
	onMounted,
} from "vue";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Divider from "primevue/divider";
import Button from "primevue/button";
import Message from "primevue/message";
import Select from "primevue/select";

import {validateInvoice} from "@/features/settings/domainRules";
import {invoiceNumberFormatOptions} from "../options";
import {useSettingsStore} from "../../store/useSettingsStore.js";
import {paymentMethodOptions} from "@/shared/options";


const emit = defineEmits([
	"action",
]);


// --------------------
// state
// --------------------
const settingsStore = useSettingsStore();
const errors = ref({});
const invoiceSettings = ref();


onMounted(async () => {
	invoiceSettings.value = await settingsStore.getInvoice();

	console.log(invoiceSettings.value);
});


// --------------------
// invoice number preview
// --------------------
const invoiceNumberPreview = computed(() => {
	if (!invoiceSettings.value) {
		return "";
	}

	const prefix = invoiceSettings.value.invoicePrefix ?? "";

	const format = invoiceSettings.value.invoiceNumberFormat ?? "";

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
		invoiceSettings: invoiceSettings.value,
	});

	errors.value = result.errors;

	if(!result.valid){
		return;
	}

	emit(
		"action",
		{
			action: "update",
			invoiceSettings: result.invoiceSettings,
		}
	);
}
</script>


<template>
	<form v-if="invoiceSettings">
		<h2>Rechnungsnummer</h2>

		<div class="input-group">

			<div class="input">
				<label for="invoicePrefix">
					Präfix
				</label>

				<InputText
					id="invoicePrefix"
					v-model="invoiceSettings.invoicePrefix"
					:placeholder="invoiceSettings.invoicePrefix"
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
					Rechnungnummer Format
				</label>

				<Select
					id="invoiceNumberFormat"
					v-model="invoiceSettings.invoiceNumberFormat"
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
					{{ errors.invoiceNumberinvoiceSettingsat }}
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
				<label for="dueDays">
					Fälligkeit (Tage)
				</label>

				<InputNumber
					id="dueDays"
					v-model="invoiceSettings.dueDays"
				/>

				<Message
					v-if="errors.dueDays"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.dueDays }}
				</Message>
			</div>

			<div class="input">
				<label for="paymentMethod">
					Zahlungs Methode
				</label>

				<Select
					v-model="invoiceSettings.paymentMethod"
					:options="paymentMethodOptions"
					optionLabel="label"
					optionValue="value"
					placeholder="Zahlungsart auswählen"
				/>

				<Message
					v-if="errors.paymentMethod"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.paymentMethod }}
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
					v-model="invoiceSettings.currency"
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
					v-model="invoiceSettings.language"
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
				<label for="taxRate">
					Standard-Steuersatz (%)
				</label>

				<InputNumber
					id="taxRate"
					v-model="invoiceSettings.taxRate"
				/>

				<Message
					v-if="errors.taxRate"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.taxRate}}
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
