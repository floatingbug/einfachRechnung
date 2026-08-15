<script setup>
import {ref} from "vue";
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import {formatCurrency} from "@/shared/helpers";


const props = defineProps({
	items: {
		type: Array,
		default: () =>  [],
	},
});
const tableItems = ref([]);

tableItems.value = props.items.map(item => ({
	title: item.title,
	quantity: item.quantity,
	unitPrice: item.unitPrice,
	unit: item.unit,
	taxRate: item.taxRate,
	totalGross: item.totalGross,
}))

</script>


<template>
	<DataTable
		:value="tableItems"
	>
		<Column field="title" header="Position">
		</Column>

		<Column header="Menge">
			<template #body="{data}">
				{{data.quantity}} {{data.unit}}
			</template>
		</Column>

		<Column field="unitPrice" header="Einzelpreis">
			<template #body="{data}">
				{{formatCurrency(data.quantity * data.unitPrice)}}
			</template>
		</Column>

		<Column header="MwSt.">
			<template #body="{data}">
				{{data.taxRate}} %
			</template>
		</Column>

		<Column  header="Gesamt">
			<template #body="{data}">
				{{formatCurrency(data.quantity * data.unitPrice)}}
			</template>
		</Column>
	</DataTable>
</template>


<style lang="scss" scoped>

</style>
