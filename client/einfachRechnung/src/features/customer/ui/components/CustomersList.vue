<script setup>
import { onMounted, ref } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Card from "primevue/card";

import { FilterMatchMode } from "@primevue/core/api";

import { useCustomerStore } from "../../store/useCustomerStore.js";

const emit = defineEmits(["customersList:action"]);

const customerStore = useCustomerStore();

// --- table filters ---
const filters = ref({
	name: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	email: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	city: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	postalCode: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	vatId: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
});

// --- lifecycle ---
onMounted(async () => {
	try{
		customerStore.customers = await customerStore.getCustomers();
	}
	catch {
		customerStore.customers = [];
	}
});

// --- events ---
function onRowClick(event){
	emit("customersList:action", {
		action: "openCustomer",
		customerId: event.data.id,
	});
}

</script>

<template>
	<DataTable
		class="customer-list-data-table"
		v-model:filters="filters"
		:value="customerStore.customers"
		size="large"
		filterDisplay="row"
		dataKey="id"
		rowHover
		scrollable
		:pt="{
			bodyRow: {
				style: {
					cursor: 'pointer',
				},
			},
		}"
		@rowClick="onRowClick"
	>
		<Column
			field="name"
			header="Name"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Search name"
					class="w-full"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="street"
			header="Street"
			sortable
		/>

		<Column
			field="postalCode"
			header="Postal Code"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Search postal code"
					class="w-full"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="city"
			header="City"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Search city"
					class="w-full"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="email"
			header="Email"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Search email"
					class="w-full"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="vatId"
			header="VAT ID"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Search VAT ID"
					class="w-full"
					@input="filterCallback()"
				/>
			</template>
		</Column>
	</DataTable>

	<div class="customer-list-cards">
		<Card
			v-for="customer in customerStore.customers"
			:key="customer.id"
			class="customer-list-card"
			role="button"
			tabindex="0"
			@click="onRowClick({ data: customer })"
			@keydown.enter="onRowClick({ data: customer })"
			@keydown.space.prevent="onRowClick({ data: customer })"
		>
			<template #title>{{ customer.name }}</template>
			<template #content>
				<dl class="card-fields">
					<div class="card-field"><dt>Straße</dt><dd>{{ customer.street }}</dd></div>
					<div class="card-field"><dt>PLZ</dt><dd>{{ customer.postalCode }}</dd></div>
					<div class="card-field"><dt>Ort</dt><dd>{{ customer.city }}</dd></div>
					<div class="card-field"><dt>E-Mail</dt><dd>{{ customer.email }}</dd></div>
					<div class="card-field"><dt>USt-ID</dt><dd>{{ customer.vatId }}</dd></div>
				</dl>
			</template>
		</Card>
	</div>
</template>

<style scoped lang="scss">
.customer-list-data-table {
	width: 100%;
	min-width: 0;
	border: 1px solid var(--table-border-color);
}

.customer-list-cards {
	display: none;
}

@media (max-width: 767px) {
	.customer-list-data-table {
		display: none;
	}

	.customer-list-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
		gap: var(--space-md);
	}
}

.customer-list-card {
	cursor: pointer;
	transition: transform 160ms ease, box-shadow 160ms ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: var(--p-overlay-popover-shadow);
	}

	&:focus-within {
		outline: 2px solid var(--p-focus-ring-color);
		outline-offset: 2px;
	}
}

.card-fields {
	display: grid;
	gap: var(--space-sm);
	margin: 0;
}

.card-field {
	display: flex;
	justify-content: space-between;
	gap: var(--space-md);
	border-top: 1px solid var(--p-content-border-color);
	padding-top: var(--space-xs);
}

dt { color: var(--p-text-muted-color); }
dd { margin: 0; font-weight: 500; text-align: right; }
</style>
