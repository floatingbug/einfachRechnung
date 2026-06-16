import {defineStore} from "pinia";
import actions from "./actions";


const useCustomerStore = defineStore("customer", {
	state: () => ({
		customers: [],
		selectedCustomer: {},
		editCustomer: {},
		draftCustomer: {},
	}),

	actions,
});


export {useCustomerStore};
