<script setup>
import {ref} from "vue";
import { PageContainer } from '@/shared/components';
import { InputText, Select} from 'primevue';


const props = defineProps({
	modelValue: {
		type: Object,
		required: true,
	}
});


const emit = defineEmits([ "update:modelValue" ]);


function onUpdateModelValue(event, field){
	emit("update:modelValue", {
		...props.modelValue,
		[field]: event,
	});
}


const customerTypeOptions = ref([
	{
		label: "Firma",
		value: "company",
	},
	{
		label: "Privat Kunde",
		value: "private",
	},
]);

</script>


<template>
	<PageContainer>
		<form>
			<div class="select-customer-type">
				<label for="customerType">Kundentyp auswählen</label>

				<Select
					:modelValue="modelValue.customerType"
					@update:modelValue="onUpdateModelValue($event, 'customerType')"
					:options="customerTypeOptions"
					optionLabel="label"
					optionValue="value"
				/>
			</div>

			<Divider />

			<div class="input-group" v-if="modelValue.customerType === 'company'">
				<div class="input">
					<label for="company">Firma</label>

					{{modelValue.companyName}}

					<InputText
						:modelValue="modelValue.companyName"
						@update:modelValue="onUpdateModelValue($event, 'companyName')"
					/>
				</div>

				<div class="input">
					<label for="contactPerson">Ansprechpartner</label>

					<InputText
						:modelValue="modelValue.contactPerson"
						@update:modelValue="onUpdateModelValue($event, 'contactPerson')"
					/>
				</div>
			</div>

			<div class="input-group" v-if="modelValue.customerType === 'private'">
				<div class="input">
					<label for="firstName">Vorname</label>

					<InputText
						:modelValue="modelValue.firstName"
						@update:modelValue="onUpdateModelValue($event, 'firstName')"
					/>
				</div>

				<div class="input">
					<label for="lastName">Nachname</label>

					<InputText
						:modelValue="modelValue.lastName"
						@update:modelValue="onUpdateModelValue($event, 'lastName')"
					/>
				</div>
			</div>
		</form>
	</PageContainer>
</template>


<style lang="scss" scoped>
.select-customer-type {
	max-width: 420px;
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}
</style>
