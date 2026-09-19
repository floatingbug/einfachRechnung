<script setup>
import {ref} from "vue";


const props = defineProps({
	customer: {
		type: Object,
		required: true,
	}
});


const customerContactItems = ref();


if(props.customer.customerType === "company"){
	customerContactItems.value = [
		{
			label: "Firma",
			value: props.customer.companyName
		},
		{
			label: "Ansprechpartner",
			value: props.customer.contactPerson ?? "-",
		},
		{
			label: "E-Mail",
			value: props.customer.email,
		},
		{
			label: "Telefon",
			value: props.customer.phone,
		}
	];
}
else {
	customerContactItems.value = [
		{
			label: "Vor. und Nachname",
			value: `${props.customer.firstName} ${props.customer.lastName}`
		},
		{
			label: "E-Mail",
			value: props.customer.email,
		},
		{
			label: "Telefon",
			value: props.customer.phone,
		}
	];
}
</script>


<template>
	<div class="customer-contact">
		<div class="item-group-1-column">
			<div class="item"
				v-for="(item, index) in customerContactItems"
				:key="index"
			>
				<div class="item-label">
					{{item.label}}
				</div>

				<div class="item-value">
					{{item.value}}
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.customer-contact {
	width: 100%;
}
</style>
