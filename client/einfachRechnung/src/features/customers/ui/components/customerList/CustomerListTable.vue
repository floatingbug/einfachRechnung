<script setup>
import { computed, ref } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import {
	DataTable,
	Column,
	InputText,
} from "primevue";


const props = defineProps({
	customers: {
		type: Array,
		default: () => [],
	},
});


const emit = defineEmits([ "customerSelected" ]);


const filters = ref({
	customerName: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	email: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	phone: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	city: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
});


const customerRows = computed(() => {
	return props.customers.map((customer) => {
		const isCompany = customer.customerType === "company";

		const customerName = isCompany
			? customer.companyName ?? ""
			: `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();

		const customerSortName = isCompany
			? customer.companyName ?? ""
			: customer.lastName ?? "";

		const contactName = isCompany
			? customer.contactPerson ?? ""
			: `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();

		return {
			...customer,
			customerName,
			customerSortName,
			contactName,
		};
	});
});
</script>


<template>
	<DataTable
		class="customer-list-data-table"
		v-model:filters="filters"
		:value="customerRows"
		size="large"
		filterDisplay="row"
		dataKey="id"
		rowHover
		sortMode="single"
		removableSort
		:pt="{
			bodyRow: {
				style: {
					cursor: 'pointer',
				},
			},
		}"

		@row-click="emit('customerSelected', $event.data._id)"
	>
		<Column
			field="customerName"
			sortField="customerSortName"
			header="Kunde"
			sortable
			filter
		>
			<template #body="{ data }">
				{{ data.customerName || "-" }}
			</template>

			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Suchen"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="contactName"
			header="Kontakt"
			sortable
		>
			<template #body="{ data }">
				{{ data.contactName || "-" }}
			</template>
		</Column>

		<Column
			field="email"
			header="E-Mail"
			sortable
			filter
		>
			<template #body="{ data }">
				{{ data.email || "-" }}
			</template>

			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Suchen"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="phone"
			header="Telefon"
			sortable
			filter
		>
			<template #body="{ data }">
				{{ data.phone || "-" }}
			</template>

			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Suchen"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="city"
			header="Ort"
			sortable
			filter
		>
			<template #body="{ data }">
				{{ data.city || "-" }}
			</template>

			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Suchen"
					@input="filterCallback()"
				/>
			</template>
		</Column>
	</DataTable>
</template>


<style lang="scss" scoped>
.customer-list-data-table {
	width: 100%;
	min-width: 0;
	border: 1px solid var(--table-border-color);
}
</style>
