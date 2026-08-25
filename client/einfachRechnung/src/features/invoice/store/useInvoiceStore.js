import { defineStore } from 'pinia'
import {actions} from "./actions";

export default defineStore("invoice", {
	state: () => ({
		invoice: {},
		invoices: [],
		pagination: {},
		invoiceDraft: {},
	}),

	actions,
})
