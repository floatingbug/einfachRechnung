export function deleteItem({id}){
	this.draftOffer.items = this.draftOffer.items
		.filter(item => item.id !== id);
}
