<script setup>
import { ref } from "vue";

import AutoComplete from "primevue/autocomplete";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

import { useCustomerStore } from "@/features/customer/store/useCustomerStore.js";

// --- emits ---
const emit = defineEmits([
	"select",
]);

// --- store ---
const customerStore = useCustomerStore();

// --- state ---
const selectedCustomer = ref(null);

const results = ref([]);

const loading = ref(false);

const showCreateModal = ref(false);

const newCustomer = ref({
	name: "",
	street: "",
	postalCode: "",
	city: "",
	email: "",
});

// --- search ---
async function searchCustomers(event){
	loading.value = true;

	try{
		results.value = await customerStore.findCustomers({
			query: {
				search: event.query,
			},
		});
	}
	finally{
		loading.value = false;
	}
}

// --- select existing ---
function selectCustomer(event){
	emit("select", event.value);
}

// --- create new ---
async function createCustomer(){
	const created = await customerStore.createCustomer({
		data: newCustomer.value,
	});

	showCreateModal.value = false;

	emit("select", created);

	selectedCustomer.value = created;

	// reset form
	newCustomer.value = {
		name: "",
		street: "",
		postalCode: "",
		city: "",
		email: "",
	};
}
</script>

<template>
	<div class="customer-select">

		<div class="input">
			<label for="customer">
				Kunde
			</label>

			<AutoComplete
				id="customer"
				v-model="selectedCustomer"
				:suggestions="results"
				optionLabel="name"
				placeholder="Kunde suchen..."
				forceSelection
				dropdown
				class="w-full"
				@complete="searchCustomers"
				@item-select="selectCustomer"
			>
				<template #option="{ option }">
					<div class="result-item">
						<div class="name">
							{{ option.name }}
						</div>

						<div class="meta">
							{{ option.street }}
							·
							{{ option.postalCode }}
							{{ option.city }}
						</div>

						<div class="meta">
							{{ option.email }}
						</div>
					</div>
				</template>

				<template #empty>
					<div class="no-results">
						<span>Kein Kunde gefunden</span>

						<Button
							label="Neuen Kunden anlegen"
							text
							size="small"
							@click="showCreateModal = true"
						/>
					</div>
				</template>
			</AutoComplete>
		</div>

		<!-- Create Modal -->
		<Dialog
			v-model:visible="showCreateModal"
			header="Kunde anlegen"
			modal
			:style="{ width: '500px' }"
		>
			<div class="form">

				<div class="input">
					<label>Name</label>
					<InputText v-model="newCustomer.name" />
				</div>

				<div class="input">
					<label>Straße</label>
					<InputText v-model="newCustomer.street" />
				</div>

				<div class="input">
					<label>PLZ</label>
					<InputText v-model="newCustomer.postalCode" />
				</div>

				<div class="input">
					<label>Stadt</label>
					<InputText v-model="newCustomer.city" />
				</div>

				<div class="input">
					<label>E-Mail</label>
					<InputText v-model="newCustomer.email" />
				</div>

			</div>

			<template #footer>
				<Button
					label="Abbrechen"
					severity="secondary"
					@click="showCreateModal = false"
				/>

				<Button
					label="Speichern"
					@click="createCustomer"
				/>
			</template>
		</Dialog>

	</div>
</template>

<style scoped>
.customer-select {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
	width: 100%;
}

.input {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.result-item {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	padding: 0.25rem 0;
}

.name {
	font-weight: 600;
}

.meta {
	font-size: 0.875rem;
	color: #666;
}

.no-results {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 0.5rem 0;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
