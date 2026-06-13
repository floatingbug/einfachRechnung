<script setup>
import {
	ref,
	watch,
	toRaw,
} from "vue";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Message from "primevue/message";

import {validateTax} from "@/features/settings/domainRules";


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

	emit("submit", {
		data: result.data,
	});
}

</script>


<template>
	<div class="tax-settings-form">

		<h2>Mehrwertsteuer</h2>

		<div class="grid">

			<div class="field switch-field">
				<label>Mehrwertsteuer aktiviert</label>

				<InputSwitch
					v-model="form.vatEnabled"
				/>

				<Message
					v-if="errors.vatEnabled"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.vatEnabled }}
				</Message>
			</div>


			<div class="field">
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


			<div class="field">
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

		<div class="grid">

			<div class="field">
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

		<h2>Reverse Charge</h2>

		<div class="grid">

			<div class="field switch-field">
				<label>Reverse-Charge aktiviert</label>

				<InputSwitch
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
