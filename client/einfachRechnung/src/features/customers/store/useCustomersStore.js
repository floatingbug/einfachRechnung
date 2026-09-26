import {defineStore} from "pinia";
import {actions} from "./actions";


const useCustomersStore = defineStore("storeId", {
	state: () => ({
		customer: null,
	}),

	actions,
});


export default useCustomersStore;
