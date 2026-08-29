<script setup>
import {
	ref,
	watch,
	toRaw,
} from "vue";

import {
	InputText,
	InputNumber,
	ToggleSwitch,
	Message,
	Select,
} from "primevue";

import {validateTax} from "@/features/settings/domainRules";
import {vatModeOptions} from "../options";


const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits([
	"action",
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
// submit
// --------------------
function onSubmit(){
	const result = validateTax({
		taxSettings: form.value,
	});

	errors.value = result.errors;

	if(!result.valid){
		return;
	}

	emit("action", {
		action: "update",
		taxSettings: result.data,
	});
}

</script>


<template>
	<form>
		<h2>Mehrwertsteuer</h2>

		<div class="input-group">
			<div class="input">
				<label for="vatMode">Umsatzsteuerliche Behandlung</label>

				<Select
					v-model="form.vatMode"
					:options="vatModeOptions"
					optionLabel="label"
					optionValue="value"
				/>
			</div>

			<div class="input">
				<label>Standard-Mehrwertsteuersatz</label>

				<InputNumber
					v-model="form.defaultVatRate"
					:min="0"
					:max="100"
					:suffix="' %'"
				/>

				<Message
					v-if="errors.defaultVatRate"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.defaultVatRate }}
				</Message>
			</div>


			<div class="input">
				<label>Reduzierter Mehrwertsteuersatz</label>

				<InputNumber
					v-model="form.reducedVatRate"
					:min="0"
					:max="100"
					:suffix="' %'"
				/>

				<Message
					v-if="errors.reducedVatRate"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.reducedVatRate }}
				</Message>
			</div>

		</div>

		<Divider />

		<h2>Steuerland</h2>

		<div class="input-group">

			<div class="input">
				<label>Steuer-Ländercode</label>

				<InputText
					v-model="form.taxCountryCode"
				/>

				<Message
					v-if="errors.taxCountryCode"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.taxCountryCode }}
				</Message>
			</div>

		</div>

		<Divider />

		<h2>Steuerschuldnerschaft</h2>

		<div class="input-group">

			<div class="input switch-field">
				<label>Steuerschuldnerschaft des Leistungsempfängers</label>

				<ToggleSwitch
					v-model="form.reverseChargeEnabled"
				/>

				<Message
					v-if="errors.reverseChargeEnabled"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.reverseChargeEnabled }}
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

	</form>
</template>


<style scoped lang="scss">
.tax-settings-form {
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}

.grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: var(--space-md);
}

.field {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.switch-field {
	justify-content: flex-end;
}

.actions {
	display: flex;
	justify-content: flex-end;
	margin-top: var(--space-md);
}
</style>
