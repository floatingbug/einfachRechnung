<script setup>
import { DataTable, Column, Tag } from 'primevue';
import {formatCurrency, formatDate} from "@/shared/helpers"
import {getOfferStatus} from "@/features/offer/ui/items/statusItems"


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

			<Column header="Angebotsbeginn">
				<template #body="{data}">
					{{formatDate(data.offerDate)}}
				</template>
			</Column>

			<Column header="Gültig bis">
				<template #body="{data}">
					{{formatDate(data.validUntil)}}
				</template>
			</Column>

			<Column header="Betrag">
				<template #body="{data}">
					{{formatCurrency(data.totals.totalGross)}}
				</template>
			</Column>

			<Column header="Status">
				<template #body="{data}">
					<Tag
						:value="getOfferStatus(data.status).label"
						:severity="getOfferStatus(data.status).severity"
						rounded
					/>
				</template>
			</Column>
		</DataTable>
	</div>
</template>


<style lang="scss" scoped>

</style>
