<!-- src/features/settings/ui/components/EmailSettingsForm.vue -->

<script setup>
import { ref, watch, toRaw } from "vue";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Message from "primevue/message";

import { validateEmail } from "@/features/settings/domainRules";


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
	const result = validateEmail({
		emailSettings: form.value,
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
	<div class="email-settings-form">

		<h2>E-Mail Einstellungen</h2>

		<div class="grid">

			<div class="field">
				<label>SMTP Host</label>

				<InputText v-model="form.smtpHost" />

				<Message
					v-if="errors.smtpHost"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.smtpHost }}
				</Message>
			</div>


			<div class="field">
				<label>SMTP Port</label>

				<InputNumber v-model="form.smtpPort" />

				<Message
					v-if="errors.smtpPort"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.smtpPort }}
				</Message>
			</div>


			<div class="field">
				<label>Benutzername</label>

				<InputText v-model="form.username" />

				<Message
					v-if="errors.username"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.username }}
				</Message>
			</div>


			<div class="field">
				<label>Passwort</label>

				<InputText
					v-model="form.password"
					type="password"
				/>

				<Message
					v-if="errors.password"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.password }}
				</Message>
			</div>


			<div class="field">
				<label>Absender E-Mail</label>

				<InputText v-model="form.fromEmail" />

				<Message
					v-if="errors.fromEmail"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.fromEmail }}
				</Message>
			</div>


			<div class="field">
				<label>Absender Name</label>

				<InputText v-model="form.fromName" />

				<Message
					v-if="errors.fromName"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.fromName }}
				</Message>
			</div>


			<div class="field switch-field">
				<label>Sichere Verbindung (SSL)</label>

				<InputSwitch v-model="form.secure" />

				<Message
					v-if="errors.secure"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.secure }}
				</Message>
			</div>


			<div class="field switch-field">
				<label>Automatischer Rechnungsversand</label>

				<InputSwitch
					v-model="form.autoSendInvoices"
				/>

				<Message
					v-if="errors.autoSendInvoices"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.autoSendInvoices }}
				</Message>
			</div>


			<div class="field">
				<label>Reply-To E-Mail</label>

				<InputText
					v-model="form.replyToEmail"
				/>

				<Message
					v-if="errors.replyToEmail"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.replyToEmail }}
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
.email-settings-form {
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
