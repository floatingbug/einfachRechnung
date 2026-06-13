<script setup>
import { ref, watch, toRaw } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Message from "primevue/message";

import { validateCompany } from "@/features/settings/domainRules";


const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits([
	"submit",
]);


// --- state ---
const form = ref({});
const errors = ref({});


// --- sync props -> form ---
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


// --- submit ---
function onSubmit(){
	const result = validateCompany({company: form.value});

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
	<div class="company-settings-form">

		<h2>Firmendaten</h2>

		<div class="grid">

			<div class="field">
				<label>Firmenname</label>

				<InputText v-model="form.companyName" />

				<Message
					v-if="errors.companyName"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.companyName }}
				</Message>
			</div>


			<div class="field">
				<label>Inhaber</label>

				<InputText v-model="form.ownerName" />

				<Message
					v-if="errors.ownerName"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.ownerName }}
				</Message>
			</div>


			<div class="field">
				<label>E-Mail</label>

				<InputText v-model="form.email" />

				<Message
					v-if="errors.email"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.email }}
				</Message>
			</div>


			<div class="field">
				<label>Telefon</label>

				<InputText v-model="form.phone" />

				<Message
					v-if="errors.phone"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.phone }}
				</Message>
			</div>


			<div class="field">
				<label>Website</label>

				<InputText v-model="form.website" />

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

		<div class="grid">

			<div class="field">
				<label>Straße</label>

				<InputText v-model="form.street" />

				<Message
					v-if="errors.street"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.street }}
				</Message>
			</div>


			<div class="field">
				<label>Stadt</label>

				<InputText v-model="form.city" />

				<Message
					v-if="errors.city"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.city }}
				</Message>
			</div>


			<div class="field">
				<label>Postleitzahl</label>

				<InputText v-model="form.postalCode" />

				<Message
					v-if="errors.postalCode"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.postalCode }}
				</Message>
			</div>


			<div class="field">
				<label>Ländercode</label>

				<InputText v-model="form.countryCode" />

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

		<h2>Steuerdaten</h2>

		<div class="grid">

			<div class="field">
				<label>USt-ID</label>

				<InputText v-model="form.vatId" />

				<Message
					v-if="errors.vatId"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.vatId }}
				</Message>
			</div>


			<div class="field">
				<label>Steuernummer</label>

				<InputText v-model="form.taxNumber" />

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
.company-settings-form {
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

.actions {
	display: flex;
	justify-content: flex-end;
	margin-top: var(--space-md);
}
</style>
