import {defineStore} from "pinia";
import actions from "./actions";


const useCustomerStore = defineStore("customer", {
	state: () => ({
		customers: [],
		draftCustomer: {},
	}),

	actions,
});


export {useCustomerStore};
