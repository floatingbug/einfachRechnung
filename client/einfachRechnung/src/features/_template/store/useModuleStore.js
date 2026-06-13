import {defineStore} from "pinia";
import actions from "./actions";


const useModuleStore = defineStore("storeId", {
	state: () => ({
	}),

	actions,
});


export {useModuleStore};
