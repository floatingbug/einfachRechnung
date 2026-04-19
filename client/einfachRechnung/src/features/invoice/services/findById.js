import invoiceApi from "../api";


export default async function findById({invoiceId}){
	const result = await invoiceApi.findById({invoiceId});
}
