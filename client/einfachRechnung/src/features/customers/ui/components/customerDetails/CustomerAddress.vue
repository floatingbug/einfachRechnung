<script setup>
import {ref} from "vue";


const props = defineProps({
	customer: {
		type: Object,
		required: true,
	}
});


const customerAddressItems = ref([
	{
		label: "Straße",
		value: props.customer.street,
	},
	{
		label: "Postleitzahl",
		value: props.customer.postalCode,
	},
	{
		label: "Wohnort",
		value: props.customer.city,
	},
	{
		label: "Länder Code",
		value: props.customer.countryCode,
	},
]);
</script>


<template>
	<div class="customer-address">
		<div class="item-group-1-column">
			<div class="item"
				v-for="(item, index) in customerAddressItems"
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
.customer-address {
	width: 100%;
}
</style>
