import {createCustomer} from "./createCustomer.js";
import {getCustomers, findCustomers} from "./getCustomers.js";
import {selectCustomer} from "./selectCustomer.js";
import {updateCustomer} from "./updateCustomer.js";


export const useCases = {
	createCustomer,
	getCustomers,
	findCustomers,
	selectCustomer,
	updateCustomer,
};
