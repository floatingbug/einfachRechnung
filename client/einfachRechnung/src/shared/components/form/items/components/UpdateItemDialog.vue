<script setup>
import {ref, watch, toRaw} from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dialog from 'primevue/dialog';
import SelectButton from 'primevue/selectbutton';
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import {
	discountTypeOptions,
	taxRateOptions,
	unitOptions,
} from "../../../../options";;


const props = defineProps({
	isDialogVisible: {
		type: Boolean,
		required: true,
		default: false,
	},
	selectedItem: {
		type: Object,
		default: null,
	},
});


const emit = defineEmits([ "action", "close" ]);


const item = ref();


watch(
	() => props.isDialogVisible,
	() => {
		item.value = structuredClone(toRaw(props.selectedItem));
	}
);


function onSubmit(){
	emit("action", {
		action: "updateItem",
		item: item.value,
	});
}

function onUpdateVisible(){
	emit("close");
}

</script>


<template>
	<Dialog
		header="Position Ändern"
		:visible="isDialogVisible"
		@update:visible="onUpdateVisible"
		modal
		:pt="{
			 root: {
				style: {
					width: '90%',
					'max-width': '800px'
				}
			 }
		}"
	>
		<form @submit.prevent="onSubmit">
			<div class="input-group-dialog">
				<div class="one-column">
					<div class="input">
						<label for="title">Position</label>
						<InputText
							v-model="item.title"
						/>
					</div>
				</div>

				<div class="two-columns">
					<div class="input description">
						<label for="description">Beschreibung</label>
						<Textarea class="input-description"
							v-model="item.description"
						/>
					</div>
				</div>

				<Divider />

				<div class="one-column">
					<div class="input">
						<label for="quantity">Anzahl</label>
						<InputNumber
							v-model="item.quantity"
						/>
					</div>
				</div>

				<div class="two-columns">
					<div class="input">
						<label for="unit">Einheit</label>
						<Select
							v-model="item.unit"
							:options="unitOptions"
							optionLabel="label"
							optionValue="value"
						/>
					</div>

					<div class="input">
						<label for="unitPrice">Preis / Einheit</label>
						<InputNumber
							v-model="item.unitPrice"
							mode="currency"
							currency="EUR"
						/>
					</div>
				</div>

				<Divider />

				<div class="one-column">
					<div class="input">
						<label for="tax">MwSt.</label>
						<Select
							v-model="item.taxRate"
							:options="taxRateOptions"
							optionLabel="label"
							optionValue="value"
						/>
					</div>
				</div>

				<Divider />

				<div class="two-columns">
					<div class="input">
						<label for="discountType">Rabatt Typ (Optional)</label>
						<SelectButton
							v-model="item.discountType"
							:options="discountTypeOptions"
							optionLabel="label"
							optionValue="value"
							local="de-DE"
						/>
					</div>

					<div class="input">
						<label for="discountValue">Rabatt Wert (Optional)</label>
						<InputNumber
							v-model="item.discountValue"
							:mode="item.discountType === 'fixed' ? 'currency' : 'decimal'"
							currency="EUR"
							:suffix="item.discountType === 'percentage' ? ' %' : ''"
						/>
					</div>
				</div>
			</div>

			<div class="action-buttons">
				<Button
					type="submit"
					label="Position ändern"
				/>
			</div>
		</form>
	</Dialog>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/media" as media;
@use "@/shared/styles/breakpoints" as bp;

.input-group-dialog {
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}

.one-column {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-lg);
}

.two-columns {
	display: grid;
	gap: var(--space-lg);

	@include media.up(bp.$bp-md) {
		grid-template-columns: 1fr 1fr;
	}
}

.description {
	grid-column: 1 / -1;
}

.action-buttons {
	display: flex;
	justify-content: flex-end;
	margin-top: var(--space-xl2);
}
</style>
