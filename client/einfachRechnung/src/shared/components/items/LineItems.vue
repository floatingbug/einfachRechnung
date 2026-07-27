<script setup>
import {ref, computed, nextTick} from "vue";
import ItemsList from "./components/ItemsList.vue";
import UpdateItemDialog from "./components/UpdateItemDialog.vue";


const props = defineProps({
	settings: {
		type: Object,
		default: null,
	},
});


const emit = defineEmits([
	"newItems",
]);


const isUpdateDialogVisible = ref(false);
const selectedItem = ref(null);
const items = ref([]);


function onAddItem(event){
	items.value.push(event);

	emit("newItems", items.value);
}


function onUpdate(event){
	for(var i = 0; i < items.value.length; i++){
		if(items.value[i].id === event.id){
			items.value[i] = event;
			break;
		}
	}
	emit("newItems", items.value);
	isUpdateDialogVisible.value = false;
}

function onDeleteItem(event){
	items.value = items.value.filter(item => item.id !== event);

	emit("newItems", items.value);
}

async function onOpenItem(event){
	selectedItem.value = items.value
		.find(item => item.id === event);

	await nextTick();


	isUpdateDialogVisible.value = true;
}

const totals = computed(() => {
	let subtotal = 0;
	let discount = 0;
	let tax = 0;

	for (const item of items.value) {
		const quantity = item.quantity ?? 0;
		const unitPrice = item.unitPrice ?? 0;

		const lineNet = quantity * unitPrice;
		subtotal += lineNet;

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

		discount += lineDiscount;

		const netAfterDiscount = lineNet - lineDiscount;

		const taxRate = item.taxRate ?? 0;
		tax += netAfterDiscount * (taxRate / 100);
	}

	const netAfterDiscount = subtotal - discount;
	const gross = netAfterDiscount + tax;

	return {
		subtotal,
		discount,
		netAfterDiscount,
		tax,
		gross,
	};
});

</script>

<template>
	<div class="line-items">
		<ItemsList class="item-list"
			:items="items"
			:settings="settings"
			@openItem="onOpenItem"
			@deleteItem="onDeleteItem"
			@addItem="onAddItem"
		/>

		<div class="totals">
			<div class="totals-item">
				<span class="item-label">Zwischensumme: </span>
				<span class="item-value">{{totals.subtotal}} €</span>
			</div>

			<div class="totals-item">
				<span class="item-label">Rabatt: </span> {{totals.discount}} €
			</div>

			<div class="totals-item">
				<span class="item-label">Netto nach Rabatt: </span> {{totals.netAfterDiscount}} €
			</div>

			<div class="totals-item">
				<span class="item-label">MwSt.: </span> {{totals.tax}} €
			</div>

			<div class="totals-item">
				<span class="item-label">Gesamtbetrag: </span> {{totals.gross}} €
			</div>
		</div>

		<UpdateItemDialog
			:isDialogVisible="isUpdateDialogVisible"
			:selectedItem="selectedItem"
			@update="onUpdate"
			@close="isUpdateDialogVisible = false"
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
</style>
