import mapInvoiceDtoToEntity from "./mapInvoiceDtoToEntity.js";

export default function mapInvoiceDtosToEntities(items = []){
	return items.map(mapInvoiceDtoToEntity);
}
