<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import { FilterMatchMode } from "@primevue/core/api";

defineProps({
	items: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(["action"]);

// --- table setup ---
const paymentStatuses = [
	"unpaid",
	"partial",
	"paid",
];

const statuses = [
	"draft",
	"sent",
	"cancelled",
];

const filters = ref({
	invoiceNumber: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	customer: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
	paymentStatus: {
		value: null,
		matchMode: FilterMatchMode.EQUALS,
	},
	status: {
		value: null,
		matchMode: FilterMatchMode.EQUALS,
	},
});

// --- event handler ---
function onRowClick(event){
	emit("action", {
		action: "openInvoice",
		invoiceNumber: event.data.invoiceNumber,
	});
}

</script>

<template>
	<DataTable class="invoice-list-data-table"
		v-model:filters="filters"
		:value="items"
		size="large"
		filterDisplay="row"
		dataKey="id"
		rowHover
		:pt="{
			bodyRow: {
				style: {
					cursor: 'pointer',
				},
			}
		}"
		@rowClick="onRowClick"
	>
		<Column
			field="invoiceNumber"
			header="Invoice Number"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Search invoice number"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="customer"
			header="Customer"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<InputText
					v-model="filterModel.value"
					type="text"
					placeholder="Search customer"
					@input="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="invoiceDate"
			header="Invoice Date"
			sortable
		/>

		<Column
			field="dueDate"
			header="Due Date"
			sortable
		/>

		<Column
			field="grossTotal"
			header="Gross Total"
			sortable
		/>

		<Column
			field="openAmount"
			header="Open Amount"
			sortable
		/>

		<Column
			field="paymentStatus"
			header="Payment Status"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<Select
					v-model="filterModel.value"
					:options="paymentStatuses"
					placeholder="Select payment status"
					:showClear="true"
					class="w-full"
					@change="filterCallback()"
				/>
			</template>
		</Column>

		<Column
			field="status"
			header="Status"
			sortable
			:showFilterMenu="false"
		>
			<template #filter="{ filterModel, filterCallback }">
				<Select
					v-model="filterModel.value"
					:options="statuses"
					placeholder="Select status"
					:showClear="true"
					class="w-full"
					@change="filterCallback()"
				/>
			</template>
		</Column>
	</DataTable>
</template>

<style scoped lang="scss">
.invoice-list-data-table {
	border: 1px solid var(--table-border-color);
}
</style>
