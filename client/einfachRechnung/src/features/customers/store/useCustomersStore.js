import {defineStore} from "pinia";
import {actions} from "./actions";


const useCustomersStore = defineStore("storeId", {
	state: () => ({
		customer: {},
	}),

	actions,
});


export default useCustomersStore;
