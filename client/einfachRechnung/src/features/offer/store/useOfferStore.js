import {defineStore} from "pinia";
import actions from "./actions";


const useOfferStore = defineStore("offer", {
	state: () => ({
		offers: [],
		selectedOffer: null,
		draftOffer: {},
	}),

	actions,
});


export {useOfferStore};
