import { services } from "../../services";


export async function deleteInvoice() {
	await services.deleteInvoice({
		invoiceNumber: this.invoice.invoiceNumber,
	});
}
