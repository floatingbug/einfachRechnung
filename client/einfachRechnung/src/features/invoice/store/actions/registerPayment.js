import {services} from "../../services";


export async function registerPayment({invoiceId, payment}){
	const invoice = await services.registerPayment({
		invoiceId,
		payment,
	});

	this.invoice = invoice;

	return invoice;
}
