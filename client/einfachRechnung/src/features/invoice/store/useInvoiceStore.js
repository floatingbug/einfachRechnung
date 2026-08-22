import { defineStore } from 'pinia'
import {actions} from "./actions";

export default defineStore("invoice", {
	state: () => ({
		invoices: [],
		pagination: {},
	}),

	actions,
})
