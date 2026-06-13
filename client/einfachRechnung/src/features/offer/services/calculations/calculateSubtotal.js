export function calculateSubtotal({items}){
	return items.reduce((acc, item) => {
		return acc += item.unitPrice * item.quantity;
	}, 0);
}
