import {defineStore} from "pinia";
import actions from "./actions";


const useOfferStore = defineStore("offer", {
	state: () => ({
		offers: [],
		selectedOffer: {},
		draftOffer: {},
	}),

	actions,
});


export {useOfferStore};
