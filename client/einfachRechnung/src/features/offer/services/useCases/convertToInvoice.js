import {offerApi} from "../../api";

export async function convertToInvoice({offerNumber}){
	return offerApi.convertToInvoice({offerNumber});
}
