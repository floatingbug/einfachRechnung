<script setup>
import {ref, computed, watch, nextTick} from "vue";
import ItemsList from "./components/ItemsList.vue";
import UpdateItemDialog from "./components/UpdateItemDialog.vue";
import ItemCards from "./components/ItemCards.vue";
import AddItemDialog from "./components/AddItemDialog.vue"
import {formatCurrency} from "../../../helpers";


const props = defineProps({
	modelValue: {
		type: Array,
		default: () => [],
	},
	itemSettings: {
		type: Object,
		default: null,
	},
});


const emit = defineEmits([
	"update:modelValue",
	"action",
]);


const isUpdateDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedItem = ref(null);
const items = computed({
	get: () => props.modelValue,
	set: value => emit("update:modelValue", value),
});


//--- handler ---//
function onItemsListAction(event){
	switch(event.action){
		case "addItem" :
			addItem(event.item);
		break;

		case "updateItem" :
			updateItem(event.item);
		break;

		case "deleteItem" :
			deleteItem(event.id);
		break;

		case "openItem" :
			openItem(event.id);
		break;
	}
}


function onItemCardsAction(event){
	switch(event.action){
		case "openItem" :
			openItem(event.id)
		break;

		case "createItem" :
			isAddDialogVisible.value = true;
		break;

		case "delete" :
			deleteItem(event.id);
		break;
	}
}

function onAddItemDialogAction(event){
	switch(event.action){
		case "addItem" :
			addItem(event.item);
			isAddDialogVisible.value = false;
		break;
	}
}

function onUpdateItemDialog(event){
	switch(event.action){
		case "updateItem" :
			updateItem(event.item);
		break;
	}
}


//--- helpers ---//
function addItem(item){
	items.value = [...items.value, item]
}

async function openItem(id){
	selectedItem.value = items.value
		.find(item => item.id === id);

	await nextTick();


	isUpdateDialogVisible.value = true;
}

function updateItem(updatedItem){
    items.value = items.value.map(item =>
        item.id === updatedItem.id ? updatedItem : item
    );

	isUpdateDialogVisible.value = false;
}
function deleteItem(id){
	items.value = items.value.filter(item => item.id !== id);
}

const totals = computed(() => {
	let subtotalNet = 0;
	let discountNet = 0;
	let totalTax = 0;
	const taxBreakdown = [];

	for (const item of items.value) {
		const quantity = item.quantity ?? 0;
		const unitPrice = item.unitPrice ?? 0;

		const lineNet = quantity * unitPrice;
		subtotalNet += lineNet;

		let lineDiscount = 0;

		if (item.discountValue) {
			if (item.discountType === "percentage") {
				lineDiscount = lineNet * (item.discountValue / 100);
			} else {
				lineDiscount = item.discountValue;
			}

			// Rabatt darf den Positionspreis nicht übersteigen
			lineDiscount = Math.min(lineDiscount, lineNet);
		}

		discountNet += lineDiscount;

		const netAfterDiscount = lineNet - lineDiscount;

		const taxRate = item.taxRate ?? 0;
		const lineTax = netAfterDiscount * (taxRate / 100);

		totalTax += lineTax;

		const existingTaxRate = taxBreakdown.find(
			entry => entry.taxRate === taxRate
		);

		if (existingTaxRate) {
			existingTaxRate.netAmount += netAfterDiscount;
			existingTaxRate.taxAmount += lineTax;
		} else {
			taxBreakdown.push({
				taxRate,
				netAmount: netAfterDiscount,
				taxAmount: lineTax,
			});
		}
	}

	const totalNet = subtotalNet - discountNet;
	const totalGross = totalNet + totalTax;

	taxBreakdown.sort((a, b) => b.taxRate - a.taxRate);

	return {
		subtotalNet,
		discountNet,
		totalNet,
		totalTax,
		totalGross,
		taxBreakdown,
	};
});

watch(
	totals,
	(newTotals) => {
		emit('action', {
			action: "totalsRefreshed",
			totals: newTotals,
		});
	},
	{
		immediate: true,
	}
);

</script>

<template>
	<div class="line-items">
		<ItemsList class="item-list"
			:items="items"
			:itemSettings="itemSettings"
			@action="onItemsListAction"
		/>

		<ItemCards class="item-cards"
			:items="items"
			@action="onItemCardsAction"
		/>

		<div class="totals">
			<div class="totals-item">
				<span class="item-label">Zwischensumme: </span>
				<span class="item-value">{{formatCurrency(totals.subtotalNet)}} </span>
			</div>

			<div class="totals-item">
				<span class="item-label">Rabatt: </span> {{formatCurrency(totals.discountNet)}}
			</div>

			<div class="totals-item">
				<span class="item-label">Netto nach Rabatt: </span> {{formatCurrency(totals.totalNet)}}
			</div>

			<div class="totals-item"> <span class="item-label">MwSt.: </span> {{formatCurrency(totals.totalTax)}}
			</div>

			<div class="totals-item">
				<span class="item-label">Gesamtbetrag: </span> {{formatCurrency(totals.totalGross)}}
			</div>
		</div>

		<UpdateItemDialog
			:isDialogVisible="isUpdateDialogVisible"
			:selectedItem="selectedItem"
			@action="onUpdateItemDialog"
			@close="isUpdateDialogVisible = false"
		/>

		<AddItemDialog
			:isDialogVisible="isAddDialogVisible"
			:itemSettings="itemSettings"
			@action="onAddItemDialogAction"
			@close="isAddDialogVisible = false"
		/>
	</div>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.line-items {
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}

.item-list {
	display: none;
}

.totals {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.totals-item {
	width: 100%;
	max-width: 400px;
	display: flex;
	justify-content: space-between;
}

.item-label {
	min-width: 200px;
}

@include media.up(bp.$bp_xl) {
	.item-list {
		display: block;
	}

	.item-cards {
		display: none;
	}
}
</style>
