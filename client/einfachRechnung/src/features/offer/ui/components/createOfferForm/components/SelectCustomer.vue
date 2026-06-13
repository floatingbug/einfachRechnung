<script setup>
import {ref, onMounted, computed} from "vue";
import Select from "primevue/select";
import {useCustomerStore} from "@/features/customer/store/useCustomerStore.js";


const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
});

const emit = defineEmits([
	"update:modelValue",
]);


const customerStore = useCustomerStore();
const customers = ref([]);

const selectedCustomerId = computed({
	get(){
		return props.modelValue;
	},

	set(customerId){
		emit("update:modelValue", customerId);
	},
});

onMounted(async () => {
	customers.value = await customerStore.findCustomers();
});


</script>

<template>
	<Select
		v-model="selectedCustomerId"
		:options="customers"
		optionLabel="name"
		optionValue="id"
		placeholder="Select customer"
		filter
		showClear
		fluid
	/>
</template>
