<script setup>
import { DataTable, Column } from 'primevue';
import {formatCurrency} from "@/shared/helpers"


defineProps({
	offers: {
		type: Array,
		default: () => [],
	}
})


const emit = defineEmits([ "offerSelected" ]);

</script>


<template>
	<div class="offers-table">
		<DataTable
			:value="offers"
			selectionMode="single"
			@update:selection="emit('offerSelected', $event.offerNumber)"
		>
			<Column
				field="offerNumber"
				header="Angebotsnummer"
			/>

			<Column
				header="Angebotsbegin"
			>
				<template #body="{data}">
					{{data.offerDate.toLocaleDateString()}}
				</template>
			</Column>

			<Column
				field="validUntil"
				header="Gültig bis"
			>
				<template #body="{data}">
					{{data.validUntil.toLocaleDateString()}}
				</template>
			</Column>

			<Column
				header="Betrag"
			>
				<template #body="{data}">
					{{formatCurrency(data.totals.totalGross)}}
				</template>
			</Column>

			<Column
				field="status"
				header="Status"
			/>
		</DataTable>
	</div>
</template>


<style lang="scss" scoped>

</style>
