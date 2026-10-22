import { invoiceApi } from "../api";


export async function registerPayment({invoiceId, payment}){
	return invoiceApi.registerPayment({
		invoiceId,
		payment,
	});
}
