import {services} from "../../services";


export async function getPdf({invoiceNumber}){
	const pdf = await services.getPdf({
		invoiceNumber,
	});

	return pdf;
}
