import {createCustomer} from "./createCustomer.js";
import {getCustomers} from "./getCustomers.js";
import {selectCustomer} from "./selectCustomer.js";
import {updateCustomer} from "./updateCustomer.js";


export const useCases = {
	createCustomer,
	getCustomers,
	selectCustomer,
	updateCustomer,
};
