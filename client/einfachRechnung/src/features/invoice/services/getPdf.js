import { invoiceApi } from "../api";


export async function getPdf({invoiceNumber}){
	const pdf = await invoiceApi.getPdf({
		invoiceNumber,
	});

	return pdf;
}
