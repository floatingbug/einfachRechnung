<script setup>
import {ref, watch} from "vue";
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
import {createItemEntity} from "../../../../../features/offer/entities";
import SelectTemplate from "./SelectTemplate.vue";


const props = defineProps({
	isDialogVisible: {
		type: Boolean,
		required: true,
		default: false,
	},
	itemSettings: {
		type: Object,
		default: () => {},
	}
});


const emit = defineEmits([ "action", "close" ]);


const item = ref(createItemEntity({...props.itemSettings}));


watch(() => props.isDialogVisible, () => {
	item.value = props.isDialogVisible ?
		createItemEntity({...props.itemSettings}) :
		null;
});


//--- handler ---
function onSelectTemplate(event){
	switch(event.action){
		case "templateSelected" :
			Object.assign(
				item.value,
				event.template
			);
		break;
	}
}

function onSubmit(){
	emit("action",
		{
			action: "addItem",
			item: item.value,
		}
	);
}

function onUpdateVisible(){
	emit("close");
}

</script>


<template>
	<Dialog
		header="Neue Position"
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

		<SelectTemplate class="select-template"
			@action="onSelectTemplate"
		/>

		<form @submit.prevent="onSubmit">
			<div class="input-group">
				<div class="input">
					<div class="input">
						<label for="title">Position</label>
						<InputText
							v-model="item.title"
						/>
					</div>
				</div>

				<div class="input">
					<div class="input description">
						<label for="description">Beschreibung</label>
						<Textarea class="input-description"
							v-model="item.description"
						/>
					</div>
				</div>
			</div>

			<Divider />

			<div class="input-group">
				<div class="input">
					<div class="input">
						<label for="quantity">Anzahl</label>
						<InputNumber
							v-model="item.quantity"
						/>
					</div>
				</div>

				<div class="input">
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
			</div>

			<Divider />

			<div class="input">
				<label for="tax">MwSt.</label>
				<Select
					v-model="item.taxRate"
					:options="taxRateOptions"
					optionLabel="label"
					optionValue="value"
				/>
			</div>

			<Divider />

			<div class="input-group">
				<div class="input">
					<label for="discountType">Rabatt Typ (Optional)</label>
					<SelectButton
						v-model="item.discountType"
						:options="discountTypeOptions"
						optionLabel="label"
						optionValue="value"
						local="de-DE"
						@update:modelValue="item.discountType = $event ?? 'none'"
					/>
				</div>

				<div class="input">
					<label for="discountValue">Rabatt Wert (Optional)</label>
					<InputNumber
						:disabled="item.discountType === 'none' ? true : false"
						v-model="item.discountValue"
						:mode="item.discountType === 'fixed' ? 'currency' : 'decimal'"
						currency="EUR"
						:suffix="item.discountType === 'percentage' ? ' %' : ''"
					/>
				</div>
			</div>

			<div class="action-buttons">
				<Button
					type="submit"
					label="Position hinzufügen"
				/>
			</div>
		</form>
	</Dialog>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/media" as media;
@use "@/shared/styles/breakpoints" as bp;

.select-template {
	margin-bottom: var(--space-xl2);
}

.action-buttons {
	display: flex;
	justify-content: flex-end;
	margin-top: var(--space-xl2);
}
</style>
