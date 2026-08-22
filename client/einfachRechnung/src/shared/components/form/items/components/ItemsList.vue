<script setup>
import {  reactive, watch } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Message from "primevue/message";
import {unitOptions} from "@/shared/options";;
import Select from "primevue/select";
import SelectTemplate from "./SelectTemplate.vue";
import {createItemEntity} from "@/shared/entities";


const props = defineProps({
	items: {
		type: Array,
		default: () => [],
	},
	itemSettings: {
		type: Object,
		default: () => {},
	}
});


const emit = defineEmits(["action"]);


const newItem = reactive(createItemEntity({...props.itemSettings}));
const errors = reactive(createErrors());


function addItem(){
	if(newItem.title === ""){
		return errors.title = "Position ist erforderlich"
	}

	emit("action",
		{
			action: "addItem",
			item: {...newItem}
		}
	);


	Object.assign(newItem, createItemEntity({...props.itemSettings}));
};


//--- handler ---
function onSelectTemplate(event){
	switch(event.action){
		case "templateSelected" :
			Object.assign(
				newItem,
				event.template
			);
		break;
	}
}


// --- helpers ---
const formatCurrency = (value) => {
	return new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency: "EUR",
	}).format(value);
};


const getTotal = (item) => {
	const net = item.quantity * item.unitPrice;


	const discount = item.discountValue ?? 0;

	const afterDiscount =
		net - (net * discount / 100);


	const taxRate = item.taxRate ?? 0;


	return afterDiscount +
		(afterDiscount * taxRate / 100);
};

function getUnitLabel(value) {
    return unitOptions.find(
        unit => unit.value === value
    )?.label ?? value;
}

function createErrors(){
	return {
		title: "",
		description: "",
		quantity: "",
		unit: "",
		unitprice: "",
		taxrate: "",
	};
}

watch(
	() => errors.value,
	() => {
		errors.value = createErrors();
	},
	{
		deep: true,
	}
)

</script>


<template>
	<DataTable
		:value="items"
		class="items-table"
		selectionMode="single"
		@row-select="emit('action',
			{
				action: 'openItem',
				id: $event.data.id,
			}
		)"
		scrollable
		tableStyle="min-width: 800px"
	>


		<Column
			field="title"
			header="Position"
		/>


		<Column
			field="quantity"
			header="Menge"
		/>


		<Column field="unit" header="Einheit">
			<template #body="{ data }">
				{{ getUnitLabel(data.unit) }}
			</template>
		</Column>


		<Column
			field="unitPrice"
			header="Preis / Einheit"
		>
			<template #body="{ data }">
				{{ formatCurrency(data.unitPrice) }}
			</template>
		</Column>


		<Column
			header="Gesamt"
		>
			<template #body="{ data }">
				{{ formatCurrency(getTotal(data)) }}
			</template>
		</Column>


		<Column
			header=""
			style="width:3rem"
		>
			<template #body="{ data }">

				<Button
					icon="pi pi-trash"
					severity="danger"
					text
					@click="emit('action',
						{
							action: 'deleteItem',
							id: data.id
						}
					)"
				/>

			</template>
		</Column>



		<template #footer>

			<div class="new-item-row">

				<div class="input">
					<InputText
						v-model="newItem.title"
						placeholder="Position"
						@update:modelValue="errors.title=''"
					/>
					<Message v-if="errors.title"
						severity="error"
					>
						{{errors.title}}
					</Message>
				</div>


				<InputNumber
					v-model="newItem.quantity"
					:min="1"
					placeholder="Menge"
				/>


				<Select
					v-model="newItem.unit"
					:options="unitOptions"
					optionLabel="label"
					optionValue="value"
				/>


				<InputNumber
					v-model="newItem.unitPrice"
					mode="currency"
					currency="EUR"
					locale="de-DE"
					placeholder="Preis"
				/>

				<SelectTemplate
					@action="onSelectTemplate"
				/>

				<Button
					label="Position Hinzufügen"
					@click="addItem"
				/>

			</div>
		</template>
	</DataTable>

</template>


<style scoped lang="scss">
.new-item-row {
	display:flex;
	gap:0.75rem;
	align-items: flex-start;
	flex-wrap: wrap;
}

.errors {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
	padding: var(--space-md) 0;
}
</style>
