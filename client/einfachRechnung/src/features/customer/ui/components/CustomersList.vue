<script setup>
import { onMounted, ref } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";

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
	catch(error){
		console.log("--->", error);
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
</template>

<style scoped lang="scss">
.customer-list-data-table {
	width: 100%;
	min-width: 0;
	border: 1px solid var(--table-border-color);
}
</style>
