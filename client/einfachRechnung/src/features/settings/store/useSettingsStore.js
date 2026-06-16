import {defineStore} from "pinia";
import {actions} from "./actions";


const useSettingsStore = defineStore("settings", {
	state: () => ({
		company: {},
		email: {},
		invoice: {},
		tax: {},
	}),

	actions,
});


export {useSettingsStore};
