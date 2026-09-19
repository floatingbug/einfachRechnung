<script setup>
import {DataTable, Column} from "primevue";


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

			<Column
				field="invoiceDate"
				header="Rechnungsdatum"
			/>

			<Column
				field="dueDate"
				header="Fällig bis"
			/>

			<Column
				field="grossTotal"
				header="Betrag"
			/>

			<Column
				field="status"
				header="status"
			/>
		</DataTable>
	</div>
</template>


<style lang="scss" scoped>

</style>
