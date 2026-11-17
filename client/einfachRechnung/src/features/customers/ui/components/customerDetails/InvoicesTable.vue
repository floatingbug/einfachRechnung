<script setup>
import {DataTable, Column, Tag} from "primevue";
import {formatCurrency, formatDate} from "@/shared/helpers";
import {getInvoiceStatus} from "@/features/invoice/ui/items/statusItems";


defineProps({
	invoices: {
		type: Array,
		default: () => [],
	}
});


const emit = defineEmits([ "invoiceSelected" ]);

</script>


<template>
	<div class="invoice-table">
		<DataTable
			:value="invoices"
			selectionMode="single"
			@update:selection="emit('invoiceSelected', $event.invoiceNumber)"
		>
			<Column
				field="invoiceNumber"
				header="Rechnungsnummer"
			/>

			<Column header="Rechnungsdatum">
				<template #body="{data}">
					{{formatDate(data.invoiceDate)}}
				</template>
			</Column>

			<Column header="Fällig bis">
				<template #body="{data}">
					{{formatDate(data.dueDate)}}
				</template>
			</Column>

			<Column header="Betrag">
				<template #body="{data}">
					{{formatCurrency(data.grossTotal)}}
				</template>
			</Column>

			<Column header="Status">
				<template #body="{data}">
					<Tag
						:value="getInvoiceStatus(data.status).label"
						:severity="getInvoiceStatus(data.status).severity"
						rounded
					/>
				</template>
			</Column>
		</DataTable>
	</div>
</template>


<style lang="scss" scoped>

</style>
