import { defineStore } from 'pinia'
import {actions} from "./actions";
import {mapInvoiceEntitiesToTableItems} from "../mappers";

export default defineStore("invoice", {
	state: () => ({
		invoices: [],
		pagination: {},
	}),

	getters: {
		invoiceTableItems: function(state){
			return mapInvoiceEntitiesToTableItems(state.invoices);
		},
	},

	actions,
})
