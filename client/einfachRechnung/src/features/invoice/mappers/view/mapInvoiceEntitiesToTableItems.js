import mapInvoiceEntityToTableItem from "./mapInvoiceEntityToTableItem.js";

export default function mapInvoiceEntitiesToTableItems(items = []){
	return items.map(mapInvoiceEntityToTableItem);
}
