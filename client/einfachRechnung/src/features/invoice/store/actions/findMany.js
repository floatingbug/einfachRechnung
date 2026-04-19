import services from "../../services";


export default async function findMany(params){
	const result = await services.findMany(params);
	this.invoices = result.invoices;
	this.pagination = result.pagination;
}
