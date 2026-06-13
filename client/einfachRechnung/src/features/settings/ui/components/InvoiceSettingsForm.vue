<script setup>
import {
	ref,
	watch,
	toRaw,
} from "vue";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Divider from "primevue/divider";
import Button from "primevue/button";
import Message from "primevue/message";
import {validateInvoice} from "@/features/settings/domainRules";


const props = defineProps({
	data: {
		type: Object,
		required: Boolean,
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
	}
);


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
	<div class="settings-form">

		<h2>Rechnungseinstellungen</h2>

		<div class="grid">

			<div class="field">
				<label>Rechnungspräfix</label>

				<InputText
					v-model="form.invoicePrefix"
				/>

				<Message
					v-if="errors.invoicePrefix"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.invoicePrefix }}
				</Message>
			</div>


			<div class="field">
				<label>Startnummer</label>

				<InputNumber
					v-model="form.invoiceNumberStart"
				/>

				<Message
					v-if="errors.invoiceNumberStart"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.invoiceNumberStart }}
				</Message>
			</div>


			<div class="field">
				<label>Nummernformat</label>

				<InputText
					v-model="form.invoiceNumberFormat"
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


			<div class="field">
				<label>Zahlungsziel (Tage)</label>

				<InputNumber
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


			<div class="field">
				<label>Fälligkeit (Tage)</label>

				<InputNumber
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


			<div class="field">
				<label>Standard-Währung</label>

				<InputText
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


			<div class="field">
				<label>Sprache</label>

				<InputText
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


			<div class="field">
				<label>Standard-Steuersatz (%)</label>

				<InputNumber
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

		<Divider />

		<div class="actions">
			<Button
				label="Speichern"
				icon="pi pi-save"
				@click="onSubmit"
			/>
		</div>

	</div>
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

.actions {
	display: flex;
	justify-content: flex-end;
}
</style>
