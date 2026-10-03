import { invoiceApi } from "../api";

export async function deleteInvoice({ invoiceNumber }) {

	await invoiceApi.deleteInvoice({
		invoiceNumber,
	});
}
