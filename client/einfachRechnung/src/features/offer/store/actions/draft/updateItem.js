export function updateItem({id, field, value}){
	const selectedItem = this.draftOffer.items
		.find(item => item.id === id);

	selectedItem[field] = value;
}
